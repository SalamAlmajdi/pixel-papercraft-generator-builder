type texture = {
  name: string,
  x: int,
  y: int,
  width: int,
  height: int,
}

type frame = {
  id: string,
  name: string,
  rectangle: Generator_Builder.rectangle,
  frameIndex: int,
  frameCount: int,
}

external asTextures_UNSAFE: array<{..}> => array<texture> = "%identity"
external asJson: 'a => Js.Json.t = "%identity"
external asFrame: Js.Json.t => frame = "%identity"
external asFrames: Js.Json.t => array<frame> = "%identity"

let encodeFrame = (frame: frame) => {
  frame->asJson->Js.Json.serializeExn
}

let encodeFrames = (frames: array<frame>) => {
  frames->asJson->Js.Json.serializeExn
}

let decodeFrame = (json: string) => {
  if Js.String2.length(json) > 0 {
    Some(json->Js.Json.deserializeUnsafe->asFrame)
  } else {
    None
  }
}

let decodeFrames = (json: string) => {
  if Js.String2.length(json) > 0 {
    json->Js.Json.deserializeUnsafe->asFrames
  } else {
    []
  }
}

let textureToFrames = (texture: texture, frameSize: int) => {
  let xMod = mod(texture.width, frameSize)
  let yMod = mod(texture.height, frameSize)
  if xMod > 0 || yMod > 0 {
    None
  } else {
    let rows = texture.height / frameSize
    let cols = texture.width / frameSize
    let frames = ref([])
    for col in 0 to cols - 1 {
      for row in 0 to rows - 1 {
        let frameIndex = col * rows + row
        let id = texture.name ++ "-" ++ Belt.Int.toString(frameIndex)
        let frame: frame = {
          id: id,
          name: texture.name,
          rectangle: (
            texture.x + col * frameSize,
            texture.y + row * frameSize,
            frameSize,
            frameSize,
          ),
          frameIndex: frameIndex,
          frameCount: rows * cols,
        }
        Js.Array2.push(frames.contents, frame)->ignore
      }
    }
    Some(frames.contents)
  }
}

let texturesToFrames = (textures: array<texture>, frameSize: int) => {
  textures->Belt.Array.reduce([], (acc, texture) => {
    let frames = textureToFrames(texture, frameSize)
    switch frames {
    | None => acc
    | Some(frames) => Belt.Array.concat(acc, frames)
    }
  })
}

let tilesToFrames = (tiles: array<{..}>, frameSize: int) => {
  tiles->asTextures_UNSAFE->texturesToFrames(frameSize)
}
