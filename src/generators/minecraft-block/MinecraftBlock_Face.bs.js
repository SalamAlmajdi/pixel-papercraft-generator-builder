// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Generator = require("../../builder/modules/Generator.bs.js");
var MinecraftBlock_Textures = require("./MinecraftBlock_Textures.bs.js");

function encodeFaceTexture(faceTexture) {
  return JSON.stringify(faceTexture);
}

function decodeFaceTexture(s) {
  if (s.length === 0) {
    return {
            versionId: "",
            textureId: "",
            frame: 0,
            rot: 0
          };
  } else {
    return JSON.parse(s);
  }
}

function encodeFaceTextures(faceTextures) {
  return JSON.stringify(faceTextures);
}

function decodeFaceTextures(s) {
  if (s.length === 0) {
    return [];
  } else {
    return JSON.parse(s);
  }
}

function defineInputRegion(faceId, region) {
  return Generator.defineRegionInput(region, (function (param) {
                var faceTextureString = Generator.getStringInputValue("BlockTexture");
                var faceTexture = decodeFaceTexture(faceTextureString);
                var curentFaceTextures = decodeFaceTextures(Generator.getStringInputValue(faceId));
                var newFaceTextures = curentFaceTextures.concat([faceTexture]);
                var newFaceTexturesString = JSON.stringify(newFaceTextures);
                return Generator.setStringInputValue(faceId, newFaceTexturesString);
              }));
}

function drawTexture(face, param, param$1, $staropt$star, $staropt$star$1, param$2) {
  var dh = param$1[3];
  var dw = param$1[2];
  var dy = param$1[1];
  var dx = param$1[0];
  var sh = param[3];
  var sw = param[2];
  var sy = param[1];
  var sx = param[0];
  var flip = $staropt$star !== undefined ? $staropt$star : "None";
  var rotate = $staropt$star$1 !== undefined ? $staropt$star$1 : 0.0;
  var rot = face.rot;
  var versionId = face.versionId;
  var index = MinecraftBlock_Textures.findTextureFrameIndex(versionId, face.textureId, face.frame);
  if (index === undefined) {
    return ;
  }
  var ix = index + sx | 0;
  var iy = index + sy | 0;
  var source;
  switch (rot) {
    case 0 :
        source = [
          sx,
          iy,
          sw,
          sh
        ];
        break;
    case 1 :
        source = [
          sy,
          (index + 16 | 0) - (sw + sx | 0) | 0,
          sh,
          sw
        ];
        break;
    case 2 :
        source = [
          16 - (sw + sx | 0) | 0,
          (index + 16 | 0) - (sh + sy | 0) | 0,
          sw,
          sh
        ];
        break;
    case 3 :
        source = [
          16 - (sh + sy | 0) | 0,
          ix,
          sh,
          sw
        ];
        break;
    default:
      source = [
        sx,
        iy,
        sw,
        sh
      ];
  }
  var destination;
  var exit = 0;
  if (rot > 2 || rot < 0) {
    if (rot !== 3) {
      destination = [
        dx,
        dy,
        dw,
        dh
      ];
    } else {
      exit = 1;
    }
  } else if (rot !== 1) {
    destination = [
      dx,
      dy,
      dw,
      dh
    ];
  } else {
    exit = 1;
  }
  if (exit === 1) {
    destination = [
      dx + ((dw - dh | 0) / 2 | 0) | 0,
      dy - ((dw - dh | 0) / 2 | 0) | 0,
      dh,
      dw
    ];
  }
  var rot$1 = (rotate | 0) + Math.imul(rot, 90) | 0;
  return Generator.drawTexture(versionId, source, destination, flip, undefined, undefined, rot$1, undefined);
}

function draw(faceId, source, destination, flipOpt, rotateOpt, param) {
  var flip = flipOpt !== undefined ? flipOpt : "None";
  var rotate = rotateOpt !== undefined ? rotateOpt : 0.0;
  var faceTexturesString = Generator.getStringInputValue(faceId);
  var faceTextures = decodeFaceTextures(faceTexturesString);
  faceTextures.forEach(function (faceTexture) {
        return drawTexture(faceTexture, source, destination, flip, rotate, undefined);
      });
  
}

var Textures;

exports.Textures = Textures;
exports.encodeFaceTexture = encodeFaceTexture;
exports.decodeFaceTexture = decodeFaceTexture;
exports.encodeFaceTextures = encodeFaceTextures;
exports.decodeFaceTextures = decodeFaceTextures;
exports.defineInputRegion = defineInputRegion;
exports.drawTexture = drawTexture;
exports.draw = draw;
/* Generator Not a pure module */
