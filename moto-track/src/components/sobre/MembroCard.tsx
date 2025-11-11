import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { MotiView, MotiImage } from "moti";
import { useTheme } from "~/src/context/ThemeContext";
import IconSocial from "./IconSocial";

interface MembroCardProps {
  membro: {
    nome: string;
    funcao: string;
    rm: string;
    imagem: any;
    github: string;
    linkedin: string;
  };
  index: number;
}

export default function MembroCard({ membro, index }: MembroCardProps) {
  const { colors } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 100, type: "spring" }}
      style={{
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 20,
        width: 180,
      }}
    >
      <MotiImage
        source={membro.imagem}
        style={{ width: 120, height: 120, borderRadius: 60 }}
        from={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 200 }}
      />

      <Text style={{ marginTop: 8, fontWeight: "bold", color: "#00994d", fontSize: 16 }}>
        {membro.nome}
      </Text>
      <Text style={{ fontWeight: "bold", fontSize: 14, color: colors.text }}>
        {membro.funcao}
      </Text>
      <Text style={{ fontWeight: "bold", fontSize: 14, color: colors.text }}>
        RM: {membro.rm}
      </Text>

      <View style={{ flexDirection: "row", marginTop: 10, gap: 20 }}>
        <IconSocial url={membro.github} source={require("assets/githubIcon.png")} />
        <IconSocial url={membro.linkedin} source={require("assets/linkedinIcon.png")} />
      </View>
    </MotiView>
  );
}
