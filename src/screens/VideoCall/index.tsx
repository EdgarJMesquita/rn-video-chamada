import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { RTCView, MediaStream } from "react-native-webrtc";
import { styles } from "./styles";
import { Button } from "../../components/Button";
import { UsePeer } from "../../hooks/UsePeer";
import { VideoOff } from "../../components/VideoOff";
import { DraggableView } from "../../components/DraggableView";

export function VideoCall() {
  const {
    localStream,
    remoteStream,
    handleHangup,
    isMute,
    isVideoOn,
    handleMute,
    handleVideoOff,
    isRemoteVideoOn,
  } = UsePeer();
  const [isRemoteFull, setRemoteFull] = useState(true);

  const mutedLocalStream = new MediaStream(undefined);
  localStream?.getTracks().forEach((track) => {
    track.kind !== "audio" && mutedLocalStream.addTrack(track);
  });

  const smallScreen = !isRemoteFull
    ? remoteStream?.toURL()
    : mutedLocalStream.toURL();

  const fullScreen = isRemoteFull
    ? remoteStream?.toURL()
    : mutedLocalStream.toURL();

  const isFullScreenOn = isRemoteFull
    ? isRemoteVideoOn
      ? "flex"
      : "none"
    : isVideoOn
    ? "flex"
    : "none";

  const isSmallScreenOn = isRemoteFull
    ? isVideoOn
      ? "flex"
      : "none"
    : isRemoteVideoOn
    ? "flex"
    : "none";

  if (localStream && !remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView
          streamURL={mutedLocalStream.toURL()}
          objectFit="cover"
          style={styles.fullVideo}
          mirror
        />
        <View style={styles.buttons}>
          <Button onPress={handleHangup} icon="phone" backgroundColor="red" />
        </View>
      </View>
    );
  }

  if (localStream && remoteStream && fullScreen && smallScreen) {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={() => setRemoteFull((prev) => !prev)}
          style={styles.expand}
        >
          <RTCView
            streamURL={fullScreen}
            objectFit="cover"
            style={{
              ...styles.expand,
              display: isFullScreenOn,
            }}
            mirror={!isRemoteFull}
          />
          <VideoOff
            isVisible={isRemoteFull ? isRemoteVideoOn : isVideoOn}
            style={styles.expand}
            iconSize={50}
            textShown
          />
        </Pressable>

        <DraggableView>
          <RTCView
            streamURL={smallScreen}
            objectFit="cover"
            style={{
              ...styles.expand,
              display: isSmallScreenOn,
            }}
            mirror={isRemoteFull}
          />
          <VideoOff
            isVisible={isRemoteFull ? isVideoOn : isRemoteVideoOn}
            iconSize={20}
            style={styles.expand}
          />
        </DraggableView>

        <View style={styles.buttons}>
          <Button
            onPress={handleMute}
            icon={isMute ? "mic-off" : "mic"}
            backgroundColor="#FFFFFF"
            color="black"
          />
          <Button onPress={handleHangup} icon="phone" backgroundColor="red" />
          <Button
            onPress={handleVideoOff}
            icon={isVideoOn ? "video" : "video-off"}
            backgroundColor="#FFFFFF"
            color="black"
          />
        </View>
      </View>
    );
  }
  return <Text>Carregando</Text>;
}
