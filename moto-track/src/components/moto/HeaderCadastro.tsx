import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "~/src/context/ThemeContext";
import TrocaTema from "../TrocaTema";

interface HeaderProps {
  titulo: string;
  onMenuPress: () => void;
}

export default function HeaderCadastro({ titulo, onMenuPress }: HeaderProps) {
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
        borderBottomColor: "#aaa",
        zIndex: 1,
      }}
    >
      <Pressable onPress={onMenuPress}>
        <Ionicons name="menu" size={32} color={colors.text} />
      </Pressable>
      <Text style={{ fontWeight: "bold", fontSize: 16, color: colors.text }}>
        {titulo}
      </Text>
      <TrocaTema />
      <Image
        source={require("assets/iconePerfil.png")}
        style={{ width: 32, height: 32, borderRadius: 16 }}
      />
    </View>
  );
}
