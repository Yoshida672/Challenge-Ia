import React from "react";
import { View, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "~/src/context/ThemeContext";
import TrocaTema from "../TrocaTema";
import { MotiText } from "moti";

interface Props {
  onMenu: () => void;
}

export default function HeaderRegister({ onMenu }: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.text,
        width: "100%",
      }}
    >
      <Pressable onPress={onMenu}>
        <Ionicons name="menu" size={32} color={colors.text} />
      </Pressable>

      <MotiText
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 400 }}
        style={{ fontWeight: "bold", fontSize: 16, color: colors.text }}
      >
        REGISTRAR
      </MotiText>

      <View style={{ width: 32 }} />
      <TrocaTema />
    </View>
  );
}
