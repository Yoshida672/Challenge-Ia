import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  logado: boolean;
  setLogado: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  logado: false,
  setLogado: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@user");
      setLogado(!!user);
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ logado, setLogado }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);