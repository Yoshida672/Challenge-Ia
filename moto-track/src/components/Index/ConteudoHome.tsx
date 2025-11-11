import React from "react";
import { View, Image, Pressable, Text } from "react-native";
import { Link, useRouter } from "expo-router";
import { MotiView, MotiText } from "moti";
import { useTheme } from "~/src/context/ThemeContext";
import BotaoAnimado from "../BotaoAnimado";

interface ConteudoHomeProps {
  logado: boolean;
}

export default function ConteudoHome({ logado }: ConteudoHomeProps) {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <>
      <View
        style={{
          width: "100%",
          height: 240,
          backgroundColor: colors.background,
        }}
      >
        <Image
          source={require("assets/backgroundMottu.png")}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: colors.background,
          padding: 20,
          alignItems: "center",
        }}
      >
        <MotiText
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 600 }}
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 8,
            color: colors.text,
          }}
        >
          Bem-Vindo ao Moto Track, um sistema de gestão de motos com UWDTags.
        </MotiText>

        <MotiText
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 300 }}
          style={{
            fontSize: 14,
            textAlign: "center",
            marginBottom: 20,
            color: colors.text,
          }}
        >
          Este sistema visa controlar e mapear motos usando etiquetas UWD.
        </MotiText>

<BotaoAnimado
  label={logado ? "Cadastrar Moto" : "Acessar como funcionário"}
  onPress={() => router.push(logado ? "/cadastroMoto" : "/login")}
  delay={400}
  paddingVertical={10}
  paddingHorizontal={20}
  borderRadius={25}
  borderColor="#00994d"
/>

      </View>
    </>
  );
}
