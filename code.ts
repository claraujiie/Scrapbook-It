// We only care about FrameNodes for this particular plugin,
// but I'm pretty sure we could remove the restriction and

import { fileURLToPath } from "url"

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
        scaleMode: "CROP",
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
        await hideAllNodeChildren(node)
    }
}

async function hideAllNodeChildren(node) {
    for (const n of node.children) {
        n.visible = false
    }
}

interface SlideData {
    fill: ImagePaint
    locX: number
    locY: number
    width: number
    height: number
}

async function getSlideData(node: FrameNode): Promise<SlideData> {
    const imageFill = await convertFrameNodeToImageFill(node)
    return {
        fill: imageFill,
        locX: node.x,
        locY: node.y,
        width: node.width,
        height: node.height
    }
}

async function getAllSlideData(nodes: Array<FrameNode>): Promise<Array<SlideData>> {
    const slideData: Array<SlideData> = []
    for (const node of nodes) {
        slideData.push(await getSlideData(node))
    }
    return slideData
}

async function main() {
    const allFrameNodes: Array<FrameNode> = figma.currentPage.children
        .filter(node => node.type == 'FRAME')
        .sort((a, b) => a.x - b.x) as Array<FrameNode>

    const allSlideDatas: Array<SlideData> = await getAllSlideData(allFrameNodes)

    const scrapbook: PageNode = figma.createPage()

    for (let i = 0; i < allSlideDatas.length; i++) {
        const current = allSlideDatas[i]

        const frame = figma.createFrame()
        frame.x = current.locX
        frame.y = current.locY
        frame.clipsContent = false
        frame.resize(current.width, current.height)
        scrapbook.appendChild(frame)

        // Last first
        if (i < allSlideDatas.length - 1) {
            const next = allSlideDatas[i + 1]
            // add the next image
            const slide = figma.createRectangle()
            slide.x = 0
            slide.y = 0
            slide.resize(next.width, next.height)
            slide.fills = [next.fill]
            frame.appendChild(slide)
        }

        const slide = figma.createRectangle()
        slide.x = 0
        slide.y = 0
        slide.resize(current.width, current.height)
        slide.fills = [current.fill]
        frame.appendChild(slide)

        // First last
        if (i > 0) {
            const previous = allSlideDatas[i - 1]
            // add a squished previous frame
            const squeezeWdith = previous.width / 12
            const squished = figma.createRectangle()
            squished.x = -(squeezeWdith + 20) // move the squish out of frame bounds
            squished.y = 0
            squished.resize(squeezeWdith, previous.height)
            squished.fills = [previous.fill]
            frame.appendChild(squished)
        }
    }
}

main().then(() => figma.closePlugin())

//addFrameNodeImageFillToFrameNodes(allFrameNodes).then(() => figma.closePlugin())


// sort by x then y
// order frames by increasing x and increasing y

//  Page
//      0: Frame (start)
//          Rect <- image 0
//          Rect <- image 1
//      1: Frame
//          Rect <- image 0 (squish)
//          Rect <- image 1
//          Rect <- image 2
//      2: Frame
//          Rect <- image 1 (squish)
//          Rect <- image 2
//          Rect <- image 3