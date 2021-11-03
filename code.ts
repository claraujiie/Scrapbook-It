async function convertToPNG(node: FrameNode, paint) {
    if (paint.type == "IMAGE") {
        const bytes = await node.exportAsync()
        figma.showUI(__html__, { visible: false })

        // Send the raw bytes of the file to the worker
        figma.ui.postMessage(bytes)
        const newBytes: Uint8Array = await new Promise((resolve, reject) => {
            figma.ui.onmessage = value => resolve(value as Uint8Array)
        })

        // Create a new paint for the new image. Uploading the image will give us
        // an image hash.
        const newPaint = JSON.parse(JSON.stringify(paint))
        newPaint.imageHash = figma.createImage(newBytes).hash
        return newPaint
    }
}

async function frameToPNG(node) {
    const newFills = []
    for (const paint of node.fills) {
        newFills.push(await convertToPNG(node, paint))
    }
    node.fills = newFills
}

Promise
    .all(figma.currentPage.selection
        .filter(node => node.type == 'FRAME')
        .map(selected => frameToPNG(selected)))
    .then(() => figma.closePlugin())