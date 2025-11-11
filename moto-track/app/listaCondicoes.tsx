import { useEffect, useState } from "react";
import { View, ScrollView, Text, Alert } from "react-native";
import { MotiView, AnimatePresence, MotiText } from "moti";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "~/src/context/ThemeContext";
import { useRouter } from "expo-router";

import { api } from "~/src/api/fetch";
import { api_delete } from "~/src/api/delete";
import { CondicaoResponse } from "~/types/uwb";
import { MenuItem, menuItems } from "~/types/MenuItems";

import BotaoAnimado from "~/src/components/BotaoAnimado";
import HeaderLista from "~/src/components/moto/HeaderLista";
import { Picker } from "@react-native-picker/picker";
import MenuLateral from "~/src/components/MenuLateral";

export default function ListaCondicoes() {
  const { colors } = useTheme();
  const router = useRouter();

  const [condicoes, setCondicoes] = useState<CondicaoResponse[]>([]);
  const [corSelecionada, setCorSelecionada] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [logado, setLogado] = useState(false);

  const carregarCondicoes = async () => {
    try {
      const data = await api.fetchCondicoes();
      setCondicoes(data.content || data);
    } catch (error) {
      console.error("Erro ao carregar condições:", error);
    }
  };

  const checkUser = async () => {
    const user = await AsyncStorage.getItem("@user");
    setLogado(!!user);
  };

  useEffect(() => {
    carregarCondicoes();
    checkUser();
  }, []);

  const filteredMenuItems = menuItems.filter((item: MenuItem) => {
    if (item.onlyLoggedIn && !logado) return false;
    if (item.onlyLoggedOut && logado) return false;
    return true;
  });

  const cores = Array.from(new Set(condicoes.map((c) => c.cor))).sort();

  const confirmarExclusao = (id: number) => {
    Alert.alert("Confirmar", "Deseja realmente excluir esta condição?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => handleExcluirCondicao(id),
      },
    ]);
  };

  const handleExcluirCondicao = async (id: number) => {
    const condRemovida = condicoes.find((c) => c.id === id);
    setCondicoes((prev) => prev.filter((c) => c.id !== id));
    try {
      await api_delete.deleteCondicao(id);
    } catch {
      if (condRemovida) setCondicoes((prev) => [...prev, condRemovida]);
    }
  };

  const mapaCores: Record<string, string> = {
    vermelho: "#e74c3c",
    azul: "#3498db",
    verde: "#27ae60",
    amarelo: "#f1c40f",
    preto: "#2c3e50",
    branco: "#ecf0f1",
    roxo: "#9b59b6",
    laranja: "#e67e22",
  };

  const normalizarCor = (cor: string | undefined): string => {
    if (!cor) return "";
    return cor
      .normalize("NFD") // remove acentos
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HeaderLista
        title="Lista de Condições"
        onMenuPress={() => setMenuAberto(true)}
      />

      <MenuLateral
        aberto={menuAberto}
        itens={filteredMenuItems}
        fecharMenu={() => setMenuAberto(false)}
      />

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 400 }}
        style={{ paddingHorizontal: 32, paddingTop: 24 }}
      >
        <Picker
          selectedValue={corSelecionada}
          onValueChange={setCorSelecionada}
          style={{
            backgroundColor: colors.inputBackground,
            borderRadius: 10,
            marginBottom: 20,
            color: colors.text,
          }}
        >
          <Picker.Item label="Todas as Cores" value="" />
          {cores.map((cor) => (
            <Picker.Item key={cor} label={cor} value={cor} />
          ))}
        </Picker>
      </MotiView>

      <ScrollView
        style={{ marginTop: 8, marginBottom: 16, paddingHorizontal: 32 }}
      >
        <AnimatePresence>
          {condicoes
            .filter((c) => corSelecionada === "" || c.cor === corSelecionada)
            .map((c) => {
              const corNormalizada = normalizarCor(c.cor);
              const corHex = mapaCores[corNormalizada] || "#ddd";
              return (
                <MotiView
                  key={c.id}
                  from={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 20 }}
                  transition={{ type: "timing", duration: 300 }}
                  style={{
                    borderWidth: 1,
                    borderColor: corHex === "#ecf0f1" ? "#ccc" : corHex,
                    padding: 16,
                    borderRadius: 12,
                    marginBottom: 12,
                    backgroundColor: colors.cardBackground,
                  }}
                >
                  <MotiText style={{ fontSize: 16, color: colors.text }}>
                    <Text style={{ fontWeight: "bold" }}>Nome:</Text> {c.nome}
                  </MotiText>

                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginTop: 8,
                      backgroundColor: corHex,
                      borderWidth: 1,
                      borderColor: "#999",
                    }}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      marginTop: 12,
                    }}
                  >
                    <BotaoAnimado
                      label="Editar"
                      onPress={() =>
                        router.push({
                          pathname: "/cadastroCondicoes",
                          params: { id: c.id },
                        })
                      }
                    />
                    <BotaoAnimado
                      label="Excluir"
                      onPress={() => confirmarExclusao(c.id)}
                    />
                  </View>
                </MotiView>
              );
            })}
        </AnimatePresence>
      </ScrollView>
    </View>
  );
}
