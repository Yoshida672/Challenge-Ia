import { View, Image, Pressable, Text } from "react-native";
import { MotiView, MotiText } from "moti";
import Ionicons from "@expo/vector-icons/Ionicons";
import TrocaTema from "~/src/components/TrocaTema";
import { useTheme } from "~/src/context/ThemeContext";

interface HeaderProps {
  title: string;
  onMenuPress: () => void;
}

export default function HeaderLista({ title, onMenuPress }: HeaderProps) {
  const { colors } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 400 }}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#aaa",
        zIndex: 2,
      }}
    >
      <Pressable onPress={onMenuPress}>
        <Ionicons name="menu" size={32} color={colors.text} />
      </Pressable>

      <MotiText
        from={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        transition={{ type: "timing", duration: 300 }}
        style={{ fontWeight: "bold", fontSize: 16, color: colors.text }}
      >
        {title}
      </MotiText>

      <TrocaTema />
      <Image
        source={require("assets/iconePerfil.png")}
        style={{ width: 32, height: 32, borderRadius: 16 }}
      />
    </MotiView>
  );
}
