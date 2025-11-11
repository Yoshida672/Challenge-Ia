import React from "react";
import { TextInput, View } from "react-native";
import { useTheme } from "~/src/context/ThemeContext";
import { MotiView } from "moti";

interface Props {
  email: string;
  senha: string;
  confirmSenha: string;
  setEmail: (v: string) => void;
  setSenha: (v: string) => void;
  setConfirmSenha: (v: string) => void;
}

export default function FormRegister({ email, senha, confirmSenha, setEmail, setSenha, setConfirmSenha }: Props) {
  const { colors } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", delay: 400 }}
      style={{ width: "100%", alignItems: "center" }}
    >
      {["E-mail", "Senha", "Confirmar Senha"].map((placeholder, index) => {
        const value = index === 0 ? email : index === 1 ? senha : confirmSenha;
        const setValue = index === 0 ? setEmail : index === 1 ? setSenha : setConfirmSenha;
        const secure = index > 0;

        return (
          <TextInput
            key={index}
            style={{
              width: "85%",
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
            placeholder={placeholder}
            placeholderTextColor={colors.text}
            secureTextEntry={secure}
            value={value}
            onChangeText={setValue}
          />
        );
      })}
    </MotiView>
  );
}
