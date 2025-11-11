import React, { useState } from "react";
import { View, Image, TouchableOpacity, Dimensions, Alert } from "react-native";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/services/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "~/src/context/ThemeContext";
import { MotiImage } from "moti";

import MenuLateral from "~/src/components/MenuLateral";
import HeaderRegister from "~/src/components/register/HeaderRegister";
import FormRegister from "~/src/components/register/FormRegister";
import BotaoAnimado from "~/src/components/BotaoAnimado";
import { menuItems } from "~/types/MenuItems";
import { enviarNotificacao } from "~/src/api/useNotifications";

export default function Register() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);

const itensMenu = menuItems.filter((item) => item.onlyLoggedOut || !item.onlyLoggedIn);

  const registrar = async () => {
    if (!email || !senha || !confirmSenha) {
      Alert.alert("Atenção", "Preencha todos os campos");
      return;
    }
    if (senha !== confirmSenha) {
      Alert.alert("Atenção", "As senhas não conferem");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      Alert.alert("Sucesso", "Conta criada com sucesso");
      enviarNotificacao("Registro realizado", "Bem-vindo ao Ping-Mottu!");
      router.push("/");
    } catch (error: any) {
      Alert.alert("Erro", "Algo deu errado");
    }
  };

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
      <HeaderRegister onMenu={() => setMenuAberto(!menuAberto)} />

      <MotiImage
        from={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", delay: 300 }}
        source={require("../assets/iconePerfil.png")}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          marginVertical: 32,
        }}
      />

      <FormRegister
        email={email}
        senha={senha}
        confirmSenha={confirmSenha}
        setEmail={setEmail}
        setSenha={setSenha}
        setConfirmSenha={setConfirmSenha}
      />

      <BotaoAnimado label="Registrar" onPress={registrar} />
    </View>
  );
}
