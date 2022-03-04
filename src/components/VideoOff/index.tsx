import React from "react";
import { Text, View, ViewProps } from "react-native";
import { UsePeer } from "../../hooks/UsePeer";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";

interface Props {
  isVisible: boolean;
  style?: ViewProps["style"];
  iconSize: number;
  textShown?: boolean;
}

export function VideoOff({ isVisible, style, iconSize, textShown }: Props) {
  return (
    <View
      style={[
        style,
        styles.container,
        {
          display: isVisible ? "none" : "flex",
        },
      ]}
    >
      <Feather name="video-off" color={"red"} size={iconSize} />
      {textShown && (
        <Text style={{ color: "white", marginTop: 10 }}>
          A câmera do convidado foi desligada
        </Text>
      )}
    </View>
  );
}
