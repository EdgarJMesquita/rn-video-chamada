import { createContext, ReactNode, useEffect, useState } from 'react';
import Peer from 'react-native-peerjs';
import { MediaStream } from 'react-native-webrtc';
import InCall from 'react-native-incall-manager';
import { getUserMedia } from '../../getUserMedia';
import { Alert, Button } from 'react-native';
import { UseAuth } from '../hooks/UseAuth';

const config = {
  host: 'localhost',
  port: 3003,
  path: '/peerjs',
  secure: false,
};

interface Props {
  children: ReactNode;
}

interface PeerContextProps {
  handleCall: () => Promise<void>;
  join: (call: Peer.MediaConnection) => Promise<void>;
  recuse: (call: Peer.MediaConnection) => Promise<void>;
  handleHangup: () => void;
  handleVideoOff: () => void;
  handleMute: () => void;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isMute: boolean;
  isVideoOn: boolean;
  callerId: string;
  calleeId: string;
  setCalleeId: (id: string) => void;
  isCalling: boolean;
  isRemoteVideoOn: boolean;
}

export const PeerContext = createContext({} as PeerContextProps);

export function PeerProvider({ children }: Props) {
  const { user } = UseAuth();
  const [calleeId, setCalleeId] = useState('');
  const [callerId, setCallerId] = useState('');
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [call, setCall] = useState<Peer.MediaConnection | null>(null);
  const [isCalling, setCalling] = useState(false);
  const [isVideoOn, setVideoOn] = useState(true);
  const [isMute, setMute] = useState(false);
  const [isRemoteVideoOn, setRemoteVideoOn] = useState(true);

  function clearStreams() {
    localStream?.release();
    remoteStream?.release();
    setLocalStream(null);
    setRemoteStream(null);
  }

  async function handleCall() {
    try {
      if (!peer) return alert('Missing peer');
      if (!calleeId) return alert('Missing calleeId');
      const stream = await getUserMedia({});
      const metadata = {
        metadata: `${user}`,
      };
      setCalling(true);
      setLocalStream(stream);
      const call = peer.call(calleeId, stream, metadata);
      call.on('stream', (remoteStream) => {
        InCall.setSpeakerphoneOn(true);
        setRemoteStream(remoteStream);
      });
      call.on('close', () => {
        clearStreams();
        setCalling(false);
      });
      setCall(call);
    } catch (error) {
      console.log(error);
    }
  }

  async function join(call: Peer.MediaConnection) {
    const stream = await getUserMedia({});
    InCall.setSpeakerphoneOn(true);
    setLocalStream(stream);
    call.answer(stream);
    call.on('stream', (remoteStream) => {
      setRemoteStream(remoteStream);
    });
    call.on('close', () => {
      clearStreams();
    });
    setCall(call);
    setCalleeId(call.peer);
  }

  async function recuse(call: Peer.MediaConnection) {
    call.close();
  }

  async function handleHangup() {
    call?.close();
    clearStreams();
  }

  async function handleMute() {
    const newState = !isMute;
    InCall.setMicrophoneMute(newState);
    setMute(newState);
  }

  async function handleVideoOff() {
    if (!localStream) return;
    const newState = !isVideoOn;
    setVideoOn(newState);
    localStream.getVideoTracks()[0].enabled = newState;

    // --------------------
    const conn = peer?.connect(calleeId);
    conn?.on('open', () => {
      conn?.send(JSON.stringify({ isVideoOn: newState }));
    });
    // --------------------
  }

  useEffect(() => {
    const peer = new Peer();
    setPeer(peer);
    peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
      setCallerId(id);
    });
    peer.on('call', async (call) => {
      Alert.alert(`${call.metadata ?? 'Anônimo'} está chamando`, '', [
        {
          text: 'Recusar',
          onPress: () => recuse(call),
          style: 'cancel',
        },
        {
          text: 'Aceitar',
          onPress: () => join(call),
        },
      ]);
    });
    // ---------
    peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        const { isVideoOn } = JSON.parse(data);
        if (typeof isVideoOn === 'boolean') {
          setRemoteVideoOn(isVideoOn);
        }
      });
    });
    // ---------
    return () => {
      call?.close();
    };
  }, []);

  return (
    <PeerContext.Provider
      value={{
        localStream,
        remoteStream,
        isMute,
        isVideoOn,
        callerId,
        calleeId,
        isCalling,
        isRemoteVideoOn,
        setCalleeId,
        handleCall,
        join,
        handleHangup,
        handleMute,
        handleVideoOff,
        recuse,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
}
