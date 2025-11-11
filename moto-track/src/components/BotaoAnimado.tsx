import React, { useState } from "react";
import { Pressable } from "react-native";
import { MotiView, MotiText } from "moti";
import { useTheme } from "~/src/context/ThemeContext";

interface Props {
  label: string;
  onPress: () => void;
  delay?: number;
  marginTop?: number;
  borderColor?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
  borderRadius?: number;
}

export default function BotaoAnimado({
  label,
  onPress,
  delay = 400,
  marginTop = 0,
  borderColor = "#00994d",
  paddingVertical = 10,
  paddingHorizontal = 20,
  borderRadius = 25,
}: Props) {
  const { colors } = useTheme();
  const [pressed, setPressed] = useState(false);

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", delay }}
      style={{ marginTop }}
    >
      <Pressable
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={onPress}
        style={{
          borderWidth: 1.5,
          borderColor,
          borderRadius,
          overflow: "hidden",
        }}
      >
        <MotiView
          animate={{
            scale: pressed ? 0.95 : 1,
            backgroundColor: pressed ? "rgba(0, 153, 77, 0.2)" : "transparent",
          }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          style={{
            paddingVertical,
            paddingHorizontal,
            alignItems: "center",
          }}
        >
          <MotiText
            from={{ scale: 0.9 }}
            animate={{ scale: pressed ? 0.95 : 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            style={{
              color: colors.text,
              fontWeight: "500",
              fontSize: 16,
            }}
          >
            {label}
          </MotiText>
        </MotiView>
      </Pressable>
    </MotiView>
  );
}
