import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/services/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "~/src/context/ThemeContext";
import { MotiView, MotiImage } from "moti";

import MenuLateral from "~/src/components/MenuLateral";
import HeaderLogin from "~/src/components/login/HeaderLogin";
import FormLogin from "~/src/components/login/FormLogin";
import BotaoAnimado from "~/src/components/BotaoAnimado";
import { menuItems } from "~/types/MenuItems";
import { enviarNotificacao } from "~/src/api/useNotifications";

export default function Login() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);

const itensMenu = menuItems.filter((item) => item.onlyLoggedOut || !item.onlyLoggedIn);


  const autenticar = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      Alert.alert("Sucesso", "Você conseguiu logar com sucesso");
      enviarNotificacao("Login realizado", "Bem-vindo de volta!");
      router.push("/");
    } catch (error: any) {
      if (error.code === "auth/network-request-failed")
        Alert.alert("Erro", "Verifique sua conexão");
      else if (error.code === "auth/invalid-credential")
        Alert.alert("Atenção", "Verifique as credenciais");
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@user");
      if (user) {
        router.push("/");
      } else {
      }
    };
    checkUser();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        paddingTop: 50,
      }}
    >
      <MenuLateral
        aberto={menuAberto}
        itens={itensMenu}
        fecharMenu={() => setMenuAberto(false)}
      />
      <HeaderLogin onMenu={() => setMenuAberto(!menuAberto)} />
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", delay: 300 }}
        style={{ alignItems: "center", width: "100%" }}
      >
        <MotiImage
          from={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 400 }}
          source={require("../assets/iconePerfil.png")}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            marginVertical: 32,
          }}
        />

        <FormLogin
          email={email}
          senha={senha}
          setEmail={setEmail}
          setSenha={setSenha}
        />
        <BotaoAnimado label="Entrar" onPress={autenticar} />
        <BotaoAnimado
          label="Cadastre-se"
          onPress={() => router.push("/register")}
          marginTop={20}
          delay={700}
        />
      </MotiView>
    </View>
  );
}
