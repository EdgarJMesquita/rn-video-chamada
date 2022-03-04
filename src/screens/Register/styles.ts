import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  content: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    flex: 1,
    width: "100%",
    padding: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 15,
    alignItems: "flex-start",
    color: "rgba(0,0,0,0.8)",
  },

  input: {
    height: 50,
    width: "100%",
    backgroundColor: "#DDDDDD",
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal: 25,
    color: "rgba(0,0,0,0.8)",
    marginTop: 5,
    fontSize: 15,
  },

  button: {
    width: "100%",
    height: 50,
    borderRadius: 15,
    backgroundColor: "#0052cc",
    justifyContent: "center",
    alignItems: "center",
  },

  btnTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    letterSpacing: 2,
    fontSize: 18,
  },
});
