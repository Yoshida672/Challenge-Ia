import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "~/src/context/ThemeContext";
import { MenuItem, menuItems } from "~/types/MenuItems";
import MenuLateral from "~/src/components/MenuLateral";
import HeaderSobre from "~/src/components/sobre/HeaderSobre";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants"; 

export default function SobreApp() {
  const { colors } = useTheme();
  const [menuAberto, setMenuAberto] = useState(false);
  const [logado, setLogado] = useState(false);
  const [commitHash, setCommitHash] = useState<string | null>(null);

  const filteredMenuItems: MenuItem[] = menuItems.filter((item) => {
    if (item.onlyLoggedIn && !logado) return false;
    if (item.onlyLoggedOut && logado) return false;
    return true;
  });

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@user");
      setLogado(!!user);
    };
    checkUser();

const commitHash = Constants.expoConfig?.extra?.commitHash || "não disponível";

    setCommitHash(commitHash);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HeaderSobre onMenu={() => setMenuAberto(true)} />
      <MenuLateral
        aberto={menuAberto}
        itens={filteredMenuItems}
        fecharMenu={() => setMenuAberto(false)}
      />

      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingVertical: 40 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22, color: colors.text }}>
          Sobre o App
        </Text>

        <Text
          style={{
            marginTop: 20,
            fontSize: 16,
            textAlign: "center",
            color: colors.text,
          }}
        >
          Moto Track é um aplicativo de autodiagnóstico de motos, permitindo o
          gerenciamento de motos, filtragem por filial e notificações em tempo real.
        </Text>

        <View
          style={{
            marginTop: 30,
            padding: 16,
            backgroundColor: "#f2f2f2",
            borderRadius: 10,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#333" }}>Hash do Commit:</Text>
          <Text style={{ marginTop: 8, color: "#555", fontSize: 14 }}>
            {commitHash}
          </Text>
        </View>

        <Text
          style={{
            marginTop: 40,
            fontWeight: "600",
            fontSize: 12,
            color: colors.text,
          }}
        >
          ©2025 Moto Track - Todos os direitos reservados.
        </Text>
      </ScrollView>
    </View>
  );
}
