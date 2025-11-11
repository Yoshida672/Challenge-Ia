import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "~/src/context/ThemeContext";
import { useEffect, useState } from "react";
import { api } from "~/src/api/fetch";

interface FormularioCondicaoProps {
  nome: string;
  setNome: (value: string) => void;
  cor: string;
  setCor: (value: string) => void;
  isEditing?: boolean;
}

export default function FormularioCondicoes({
  nome,
  setNome,
  cor,
  setCor,
  isEditing,
}: FormularioCondicaoProps) {
  const { colors } = useTheme();
  const [condicoesExistentes, setCondicoesExistentes] = useState<
    { nome: string; cor: string }[]
  >([]);

  const [erroNome, setErroNome] = useState("");
  const [erroCor, setErroCor] = useState("");

  const cores = [
    { nome: "vermelho", hex: "#e74c3c" },
    { nome: "azul", hex: "#3498db" },
    { nome: "verde", hex: "#27ae60" },
    { nome: "amarelo", hex: "#f1c40f" },
    { nome: "preto", hex: "#2c3e50" },
    { nome: "branco", hex: "#ecf0f1" },
    { nome: "roxo", hex: "#9b59b6" },
    { nome: "laranja", hex: "#e67e22" },
  ];

  useEffect(() => {
    api.fetchCondicoes().then((data) => {
      const lista = data.content || data;
      setCondicoesExistentes(
        lista.map((c: any) => ({
          nome: c.nome.toLowerCase().trim(),
          cor: c.cor.toLowerCase().trim(),
        }))
      );
    });
  }, []);

  // Valida nome duplicado
  useEffect(() => {
    if (!nome) {
      setErroNome("");
      return;
    }
    const existeNome = condicoesExistentes.some(
      (c) => c.nome === nome.toLowerCase().trim()
    );
    setErroNome(existeNome ? "Esse nome já está cadastrado." : "");
  }, [nome, condicoesExistentes]);

  // Valida cor duplicada
  useEffect(() => {
    if (!cor) {
      setErroCor("");
      return;
    }
    const existeCor = condicoesExistentes.some(
      (c) => c.cor === cor.toLowerCase().trim()
    );
    setErroCor(existeCor ? "Essa cor já está em uso." : "");
  }, [cor, condicoesExistentes]);

  return (
    <View>
      <Text
        style={{ color: colors.text, fontWeight: "600", marginHorizontal: 16 }}
      >
        Nome:
      </Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        placeholderTextColor={colors.text}
        style={{
          color: colors.text,
          backgroundColor: colors.inputBackground,
          marginHorizontal: 16,
          marginTop: 16,
          borderRadius: 8,
          padding: 10,
          borderWidth: erroNome ? 2 : 1,
          borderColor: erroNome ? "#e74c3c" : "transparent",
        }}
      />
      {erroNome ? (
        <Text style={{ color: "#e74c3c", marginHorizontal: 16, marginTop: 4 }}>
          {erroNome}
        </Text>
      ) : null}

      <Text
        style={{
          color: colors.text,
          fontWeight: "600",
          marginTop: 20,
          marginHorizontal: 16,
        }}
      >
        Selecione uma cor:
      </Text>

      <View style={styles.paleta}>
        {cores.map((c) => {
          const corJaUsada = condicoesExistentes.some(
            (item) => item.cor === c.nome
          );
          return (
            <TouchableOpacity
              key={c.nome}
              disabled={corJaUsada}
              style={[
                styles.corBotao,
                {
                  backgroundColor: c.hex,
                  opacity: corJaUsada ? 0.3 : 1,
                  borderColor:
                    cor === c.nome
                      ? colors.primary || "#007bff"
                      : "transparent",
                  borderWidth: cor === c.nome ? 3 : 1,
                },
              ]}
              onPress={() => setCor(c.nome)}
            />
          );
        })}
      </View>

      {erroCor ? (
        <Text style={{ color: "#e74c3c", marginHorizontal: 16, marginTop: 4 }}>
          {erroCor}
        </Text>
      ) : null}

      {cor ? (
        <Text
          style={{
            textAlign: "center",
            color: colors.text,
            marginTop: 8,
            fontStyle: "italic",
          }}
        >
          Cor selecionada: {cor}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  paleta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginHorizontal: 16,
    marginTop: 10,
  },
  corBotao: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
  },
});
