import { makeImage, makeFrame, makeVect2 } from "./lib/factory"
import { RasterizeMessage } from "./lib/model"
import { getRasterizeMessages } from "./lib/image"

(async function () {
    // We will only act on FrameNodes that are direct children to the
    // current page.
    const frameNodes: Array<FrameNode> = figma.currentPage.children
        .filter(node => node.type == 'FRAME')
        .sort((a, b) => a.x - b.x) as Array<FrameNode>

    const rasterizeMessages: Array<RasterizeMessage> = await getRasterizeMessages(frameNodes)

    // To keep everything separate, we will add the rasterized FrameNode
    // images to a new, more disposable page.
    const newPage = figma.createPage()
    // IMPORTANT: We must make the page we just created the current
    // page so that we can connection Reactions later. If we do not,
    // the Reactions will not be able to find the nodes referenced in
    // the Reactions.
    figma.currentPage = newPage

    for (let i = 0; i < rasterizeMessages.length; i++) {
        const { x, y, width, height } = rasterizeMessages[i].node
        const paint = rasterizeMessages[i].paint

        // for every rasterized image, we want to represent it within
        // a new frame.
        const frame = makeFrame(makeVect2(x, y), makeVect2(width, height), false, 'frame' + i)
        newPage.appendChild(frame)

        // If we are not on the last rasterized iamge, we need to
        // take into account NEXT images when building our frame.
        if (i < rasterizeMessages.length - 1) {
            const nextIdx = i + 1
            const { width, height } = rasterizeMessages[nextIdx].node
            const paint = rasterizeMessages[nextIdx].paint
            frame.appendChild(makeImage(paint, makeVect2(0, 0), makeVect2(width, height), 'image' + nextIdx))
        }

        frame.appendChild(makeImage(paint, makeVect2(0, 0), makeVect2(width, height), 'image' + i))

        // If we are past the first rasterized image, that means we now
        // have to take into account PREVIOUS images when we build our
        // frame.
        if (i > 0) {
            const prevIdx = i - 1
            const { width, height } = rasterizeMessages[prevIdx].node
            const paint = rasterizeMessages[prevIdx].paint

            const squeezedWidth = width / 12
            const padding = 20
            frame.appendChild(makeImage(paint, makeVect2(-(squeezedWidth + padding), 0), makeVect2(squeezedWidth, height), 'image' + prevIdx))
        }
    }

    // Get all the FrameNodes from our new page. We will only connect
    // FrameNodes to each other with Reactions.
    const newFrames = newPage.children
        .filter(node => node.type == 'FRAME') as Array<FrameNode>

    // We only need to loop up to len - 1 because the last node will
    // not have any following nodes to connect to. len - 1 also ensures
    // use that we always have a "next".
    for (let i = 0; i < newFrames.length - 1; i++) {
        const currFrame = newFrames[i]
        const nextFrame = newFrames[i + 1]

        if (i == 0) {
            newPage.flowStartingPoints = [{
                nodeId: currFrame.id,
                name: "Start Slideshow"
            }]
        }
        currFrame.reactions = [{
            action: {
                type: "NODE",
                destinationId: nextFrame.id,
                navigation: "NAVIGATE",
                preserveScrollPosition: false,
                transition: {
                    type: "SMART_ANIMATE",
                    easing: {
                        type: "EASE_OUT"
                    },
                    duration: 1
                }
            },
            trigger: {
                type: "ON_CLICK"
            }
        }]
    }
})().then(() => figma.closePlugin())