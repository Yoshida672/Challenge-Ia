import React from "react";
import { TextInput } from "react-native";
import { MotiView } from "moti";
import { useTheme } from "~/src/context/ThemeContext";

interface Props {
  email: string;
  senha: string;
  setEmail: (text: string) => void;
  setSenha: (text: string) => void;
}

export default function FormLogin({ email, senha, setEmail, setSenha }: Props) {
  const { colors } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 500 }}
      style={{ width: "85%" }}
    >
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: colors.text,
          borderRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 10,
          fontSize: 16,
          backgroundColor: colors.background,
          marginBottom: 24,
          color: colors.text,
        }}
        placeholder="E-mail"
        placeholderTextColor={colors.text}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={{
          borderWidth: 2,
          borderColor: colors.text,
          borderRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 10,
          fontSize: 16,
          backgroundColor: colors.background,
          marginBottom: 24,
          color: colors.text,
        }}
        placeholder="Senha"
        placeholderTextColor={colors.text}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
    </MotiView>
  );
}
