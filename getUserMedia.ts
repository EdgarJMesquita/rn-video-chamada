import { mediaDevices } from "react-native-webrtc";

let isFront = true;

interface Props {
  audio?: boolean;
  video?: boolean;
}

export async function getUserMedia({ audio = true, video = true }: Props) {
  try {
    const sourceInfos = await mediaDevices.enumerateDevices();

    let videoSourceId;

    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if (
        sourceInfo.kind == "videoinput" &&
        sourceInfo.facing == (isFront ? "front" : "environment")
      ) {
        videoSourceId = sourceInfo.deviceId;
      }
    }

    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 640,
        height: 480,
        frameRate: 30,
        facingMode: isFront ? "user" : "environment",
        deviceId: videoSourceId,
      },
    });

    return stream;
  } catch (error) {
    throw new Error("Não foi possível acessar a câmera/microfone");
  }
}

/* let isFront = true;

class Utils {
  async getStream() {
    const sourceInfos = await mediaDevices.enumerateDevices();

    let videoSourceId;

    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if (
        sourceInfo.kind == "videoinput" &&
        sourceInfo.facing == (isFront ? "front" : "environment")
      ) {
        videoSourceId = sourceInfo.deviceId;
      }
    }

    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 640,
        height: 480,
        frameRate: 30,
        facingMode: isFront ? "user" : "environment",
        deviceId: videoSourceId,
      },
    });
    if (stream) {
      return stream;
    }

    return null;
  }
}

export { Utils }; */
