import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UseAuth } from '../hooks/UseAuth';
import { UsePeer } from '../hooks/UsePeer';
import { Home } from '../screens/Home';
import { Register } from '../screens/Register';
import { VideoCall } from '../screens/VideoCall';

const { Navigator, Screen, Group } = createNativeStackNavigator();

export function AuthRoutes() {
  const { user } = UseAuth();
  const { localStream, remoteStream } = UsePeer();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <Group>
          {localStream ? (
            <Screen name="VideoCall" component={VideoCall} />
          ) : (
            <Screen name="Home" component={Home} />
          )}
        </Group>
      ) : (
        <Screen name="Register" component={Register} />
      )}
    </Navigator>
  );
}
