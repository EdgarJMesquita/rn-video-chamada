import { useContext } from "react";
import { PeerContext } from "../context/PeerContext";

export function UsePeer() {
  return useContext(PeerContext);
}
