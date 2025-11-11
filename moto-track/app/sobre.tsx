import React, { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { useTheme } from "~/src/context/ThemeContext";
import { MenuItem, menuItems } from "~/types/MenuItems";
import { useRouter } from "expo-router";

import MenuLateral from "~/src/components/MenuLateral";
import HeaderSobre from "~/src/components/sobre/HeaderSobre";
import MembroCard from "~/src/components/sobre/MembroCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Sobre() {
  const { colors } = useTheme();
  const [menuAberto, setMenuAberto] = useState(false);
  const [logado, setLogado] = useState(false);
  

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
  }, []);

  const membros = [
    {
      nome: "Eric Yoshida",
      funcao: "Desenvolvedor Back-End",
      rm: "558763",
      imagem: require("../assets/eric.jpg"),
      github: "https://github.com/Yoshida672",
      linkedin: "https://www.linkedin.com/in/yoshida672/",
    },
    {
      nome: "Gustavo Matias",
      funcao: "Engenheiro de Dados",
      rm: "555010",
      imagem: require("../assets/gustavo-matias.jpg"),
      github: "https://github.com/Gustavo295",
      linkedin:
        "https://www.linkedin.com/in/gustavo-matias-teixeira-2b89a7266/",
    },
    {
      nome: "Gustavo Monção",
      funcao: "Web Designer",
      rm: "557515",
      imagem: require("../assets/gustavo-moncao.jpg"),
      github: "https://github.com/moncaogustavo",
      linkedin: "https://www.linkedin.com/in/gustavo-monção-574a38224/",
    },
    
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HeaderSobre onMenu={() => setMenuAberto(true)} />
      <MenuLateral
        aberto={menuAberto}
        itens={filteredMenuItems}
        fecharMenu={() => setMenuAberto(false)}
      />

      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingVertical: 20 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {membros.map((membro, index) => (
            <MembroCard key={index} membro={membro} index={index} />
          ))}
        </View>

        <Text
          style={{
            marginTop: 20,
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
