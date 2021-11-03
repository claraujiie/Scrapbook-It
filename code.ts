// We only care about FrameNodes for this particular plugin,
// but I'm pretty sure we could remove the restriction and
// it would work on any node.
async function convertFrameNodeToImageFill(frame: FrameNode): Promise<ImagePaint> {
    // We need the UI because it gives us access to a lot
    // more Javascript features that are not allowed in the
    // Figma plugin sandbox.
    figma.showUI(__html__, { visible: false })

    // Convert the frame and all its contents into bytes.
    const frameBytes = await frame.exportAsync()

    // We need to do some byte processing so we need to
    // send them out to the UI for those added Javaascript
    // features.
    figma.ui.postMessage(frameBytes)

    // We need to define a message handler for messages 
    // sent back to us by the UI. This should be the PNG
    // bytes.
    const pngBytes: Uint8Array = await new Promise((resolve, reject) => {
        figma.ui.onmessage = value => resolve(value as Uint8Array)
    })

    // We need to create a new IMAGE fill that contains
    // our new PNG. This fill will get added to the frame.
    return {
        type: "IMAGE",
        scaleMode: "FILL",
        imageHash: figma.createImage(pngBytes).hash
    }
}

// Helper function that takes a node and ADDs a fill. This
// fill will be added at the top of the list of existing
// fills with respect to visibility.
function addFillToNode(node, fill: Paint): void {
    const updatedFills: Array<Paint> = []
    for (const paint of node.fills) {
        updatedFills.push(paint)
    }
    updatedFills.push(fill)
    node.fills = updatedFills
}

// For each FrameNode, convert it to a PNG and set the image
// to an IMAGE fill.
async function addFrameNodeImageFillToFrameNodes(nodes: Array<FrameNode>) {
    for (const node of nodes) {
        const framePNG = await convertFrameNodeToImageFill(node)
        addFillToNode(node, framePNG)
    }
}

const allFrameNodes = figma.currentPage.children.filter(node => node.type == 'FRAME') as Array<FrameNode>
addFrameNodeImageFillToFrameNodes(allFrameNodes).then(() => figma.closePlugin())