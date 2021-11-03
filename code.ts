async function convertToPNG(node: FrameNode): Promise<ImagePaint> {
    const bytes = await node.exportAsync()
    figma.showUI(__html__, { visible: false })

    // Send the raw bytes of the file to the worker
    figma.ui.postMessage(bytes)
    const newBytes: Uint8Array = await new Promise((resolve, reject) => {
        figma.ui.onmessage = value => resolve(value as Uint8Array)
    })

    return {
        type: "IMAGE",
        scaleMode: "FILL",
        imageHash: figma.createImage(newBytes).hash
    }
}

async function frameToPNG(node) {
    const newFills: Array<Paint> = []
    for (const paint of node.fills) {
        newFills.push(paint)
    }
    newFills.push(await convertToPNG(node))
    node.fills = newFills
}

Promise
    .all(figma.currentPage.selection
        .filter(node => node.type == 'FRAME')
        .map(selected => frameToPNG(selected)))
    .then(() => figma.closePlugin())