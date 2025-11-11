import React, { useState, useEffect, use } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "~/src/context/ThemeContext";
import HeaderHome from "~/src/components/Index/HeaderHome";
import MenuLateral from "~/src/components/MenuLateral";
import ConteudoHome from "~/src/components/Index/ConteudoHome";
import { menuItems, MenuItem } from "~/types/MenuItems";
import { solicitarPermissaoNotificacoes } from "~/src/api/useNotifications";

export default function Home() {
  const { colors } = useTheme();
  const [menuAberto, setMenuAberto] = useState(false);
  const [logado, setLogado] = useState(false);

  const logout = async () => {
    await AsyncStorage.removeItem("@user");
    setLogado(false);
  };

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@user");
      setLogado(!!user);
    };
    checkUser();
  }, []);
  useEffect(() => {
    solicitarPermissaoNotificacoes();
  }, []);

  const filteredMenuItems: MenuItem[] = menuItems.filter((item) => {
    if (item.onlyLoggedIn && !logado) return false;
    if (item.onlyLoggedOut && logado) return false;
    return true;
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HeaderHome
        logado={logado}
        onMenuPress={() => setMenuAberto(true)}
        onLogout={logout}
      />

      <View
        style={{ height: 1, backgroundColor: colors.text, width: "100%" }}
      />

      <MenuLateral
        aberto={menuAberto}
        itens={filteredMenuItems}
        fecharMenu={() => setMenuAberto(false)}
      />

      <ConteudoHome logado={logado} />
    </View>
  );
}
