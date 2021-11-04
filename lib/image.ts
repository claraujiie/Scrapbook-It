import { RasterizeMessage } from "./model"
import { makeRasterizeMessage } from "./factory"


export async function convertFrameNodeToImagePaint(node: FrameNode): Promise<ImagePaint> {
    // We need the UI because it gives us access to a lot
    // more Javascript features that are not allowed in the
    // Figma plugin sandbox.
    figma.showUI(__html__, { visible: false })

    // Convert the frame and all its contents into bytes.
    const frameBytes = await node.exportAsync()

    // We need to do some byte processing so we need to
    // send them out to the UI for those added Javaascript
    // features.
    figma.ui.postMessage(frameBytes)

    // We need to define a message handler for messages 
    // sent back to us by the UI. This should be the PNG
    // bytes.
    const imageBytes: Uint8Array = await new Promise((resolve, reject) => {
        figma.ui.onmessage = value => resolve(value as Uint8Array)
    })

    // We need to create a new IMAGE fill that contains
    // our new PNG. This fill will get added to the frame.
    // For our purposes, we will need to squish the image
    // in a way that distorts it requiring us to use CROP.
    return {
        type: "IMAGE",
        scaleMode: "CROP",
        imageHash: figma.createImage(imageBytes).hash
    }
}

export async function getRasterizeMessage(node: FrameNode): Promise<RasterizeMessage> {
    const imagePaint = await convertFrameNodeToImagePaint(node)
    return makeRasterizeMessage(imagePaint, node)
}

export async function getRasterizeMessages(nodes: Array<FrameNode>): Promise<Array<RasterizeMessage>> {
    const messages: Array<RasterizeMessage> = []
    // not the best way to handle async. we could be parallelizing
    // these calls better.
    for (const node of nodes) {
        messages.push(await getRasterizeMessage(node))
    }
    return messages
}