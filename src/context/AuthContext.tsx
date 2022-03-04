import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface Props {
  children: ReactNode;
}
interface AuthProps {
  user: string | null;
  signIn: (user: string) => void;
}

export const AuthContext = createContext({} as AuthProps);

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<string | null>(null);

  function signIn(user: string) {
    setUser(user);
    AsyncStorage.setItem("@user", user);
  }

  useEffect(() => {
    (async () => {
      const store = await AsyncStorage.getItem("@user");
      const data = store ? store : null;
      setUser(data);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
