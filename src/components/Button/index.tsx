import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";
import { Entypo, Feather } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
  backgroundColor: string;
  icon: "phone" | "video" | "mic" | "mic-off" | "video-off";
  color?: string;
  style?: TouchableOpacityProps["style"];
}

export function Button({
  onPress,
  backgroundColor,
  icon,
  style,
  color = "#FFFFFF",
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor }, style]}
    >
      {icon === "phone" ? (
        <Entypo name="phone" color={color} size={20} />
      ) : (
        <Feather name={icon} size={20} color={color} />
      )}
    </TouchableOpacity>
  );
}
