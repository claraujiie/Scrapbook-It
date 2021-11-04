import { Vect2, RasterizeMessage } from './model';

export function makeImage(paint: ImagePaint, pos: Vect2, dim: Vect2, name?: string): RectangleNode {
    const image = figma.createRectangle()
    image.name = name ? name : "image"
    image.x = pos.a
    image.y = pos.b
    image.resize(dim.a, dim.b)
    image.fills = [paint]
    return image
}

export function makeFrame(pos: Vect2, dim: Vect2, clipsContent: boolean = true, name?: string): FrameNode {
    const frame = figma.createFrame()
    frame.name = name
    frame.x = pos.a
    frame.y = pos.b
    frame.clipsContent = clipsContent
    frame.resize(dim.a, dim.b)
    return frame
}

export function makeRasterizeMessage(paint: ImagePaint, node: SceneNode): RasterizeMessage {
    return { paint, node }
}

export function makeVect2(a: number, b: number): Vect2 {
    return { a, b }
}

