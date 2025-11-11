import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MotiText } from "moti";
import { useTheme } from "~/src/context/ThemeContext";
import TrocaTema from "../TrocaTema";
interface HeaderProps {
  onMenu: () => void;
  title?: string;
}

export default function HeaderSobre({
  onMenu,
  title = "SOBRE NÓS",
}: HeaderProps) {
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
      <TouchableOpacity onPress={onMenu}>
        <Ionicons name="menu" size={32} color={colors.text} />
      </TouchableOpacity>

      <MotiText
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 400 }}
        style={{ fontWeight: "bold", fontSize: 16, color: colors.text }}
      >
        {title}
      </MotiText>

      <TrocaTema />

      <Image
        source={require("assets/iconePerfil.png")}
        style={{ width: 32, height: 32, borderRadius: 16 }}
      />
    </View>
  );
}
