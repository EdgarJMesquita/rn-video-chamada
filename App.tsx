import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import { PeerProvider } from './src/context/PeerContext';
import { Routes } from './src/routes';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, width: '100%' }}>
      <AuthProvider>
        <PeerProvider>
          <StatusBar style="dark" />
          <Routes />
        </PeerProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
