import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
  },

  expand: {
    flex: 1,
    width: "100%",
  },

  fullVideo: {
    flex: 1,
    width: "100%",
  },

  smallVideo: {
    width: 100,
    height: 150,
    position: "absolute",
    top: 40,
    left: 10,
  },

  buttons: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
  },
});
