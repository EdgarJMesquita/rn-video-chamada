import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamsList = {
  Home: undefined;
  Register: undefined;
  VideoCall: undefined;
};

export type NavigatorScreenProps = NativeStackScreenProps<RootStackParamsList>;
