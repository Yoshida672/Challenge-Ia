import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";
import { MotiView, MotiText } from "moti";
import { useTheme } from "~/src/context/ThemeContext";
import { MenuItem } from "~/types/MenuItems";
import { useRouter } from "expo-router";

interface MenuLateralProps {
  aberto: boolean;
  itens: MenuItem[];
  fecharMenu: () => void;
}

export default function MenuLateral({
  aberto,
  itens,
  fecharMenu,
}: MenuLateralProps) {
  const { colors } = useTheme();
  const router = useRouter();

  if (!aberto) return null;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={fecharMenu}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: Dimensions.get("window").height,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.2)",
        flexDirection: "row",
        zIndex: 10,
      }}
    >
      <MotiView
        from={{ translateX: -220, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{ type: "timing", duration: 300 }}
        style={{
          width: 220,
          backgroundColor: "#00994d",
          paddingTop: 60,
          paddingHorizontal: 20,
          height: "100%",
          zIndex: 20,
        }}
      >
        {itens.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{ marginBottom: 20 }}
            onPress={() => {
              fecharMenu();
              router.push(item.href);
            }}
          >
            <MotiText
              from={{ opacity: 0, translateX: -10 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: index * 100 }}
              style={{
                fontSize: 18,
                color: colors.text,
                fontWeight: "bold",
              }}
            >
              {"> " + item.label}
            </MotiText>
          </TouchableOpacity>
        ))}
      </MotiView>
      <View style={{ flex: 1 }} />
    </TouchableOpacity>
  );
}
