import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TrocaTema from "~/src/components/TrocaTema";
import { useTheme } from "~/src/context/ThemeContext";

interface HeaderHomeProps {
  logado: boolean;
  onMenuPress: () => void;
  onLogout: () => void;
}

export default function HeaderHome({
  logado,
  onMenuPress,
  onLogout,
}: HeaderHomeProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.text,
      }}
    >
      <Pressable onPress={onMenuPress}>
        <Ionicons name="menu" size={32} color={colors.text} />
      </Pressable>

      <Pressable
        onPress={onLogout}
        disabled={!logado}
        style={{ display: logado ? "flex" : "none" }}
      >
        <Text style={{ color: colors.text }}>Sair</Text>
      </Pressable>

      <Text style={{ fontWeight: "bold", fontSize: 16, color: colors.text }}>
        MOTOTRACK
      </Text>

      <TrocaTema />

      <Image
        source={require("assets/iconePerfil.png")}
        style={{ width: 32, height: 32, borderRadius: 16 }}
      />
    </View>
  );
}
