import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MotiView, AnimatePresence } from "moti";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "~/src/context/ThemeContext";
import { useRouter } from "expo-router";

import { api } from "../src/api/fetch";
import { api_delete } from "../src/api/delete";
import { Moto } from "../types/moto";
import { MenuItem, menuItems } from "~/types/MenuItems";
import { CondicaoResponse, UwbResponse } from "~/types/uwb";

import BotaoAnimado from "~/src/components/BotaoAnimado";
import HeaderLista from "~/src/components/moto/HeaderLista";
import MenuLateral from "~/src/components/MenuLateral";
import { api_update } from "~/src/api/update";

export default function ListaMotos() {
  const { colors } = useTheme();
  const router = useRouter();

  const [motos, setMotos] = useState<Moto[]>([]);
  const [localizacoes, setLocalizacoes] = useState<UwbResponse[]>([]);
  const [condicoes, setCondicoes] = useState<CondicaoResponse[]>([]);
  const [filialSelecionada, setFilialSelecionada] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [logado, setLogado] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);

  const carregarMotos = async () => {
    try {
      const data = await api.fetchMotos();
      setMotos(data.content || data);
    } catch (error) {
      console.error("Erro ao carregar motos:", error);
    }
  };

  const carregarLocalizacoes = async () => {
    try {
      const data = await api.fetchtags();
      setLocalizacoes(data.content || data);
    } catch (error) {
      console.error("Erro ao carregar localizações:", error);
    }
  };

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
    carregarMotos();
    carregarLocalizacoes();
    carregarCondicoes();
    checkUser();
  }, []);

  const filteredMenuItems = menuItems.filter((item: MenuItem) => {
    if (item.onlyLoggedIn && !logado) return false;
    if (item.onlyLoggedOut && logado) return false;
    return true;
  });

  const filiais = Array.from(new Set(motos.map((m) => m.filial))).sort();

  const getLocalizacaoMoto = (placa: string) =>
    localizacoes.find(
      (l) => l.moto?.trim().toLowerCase() === placa.trim().toLowerCase()
    );

  const getCorCondicao = (condicaoMoto: string) => {
    if (!condicaoMoto) return "#95a5a6";

    const nomeMoto = condicaoMoto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();

    const cond = condicoes.find(
      (c) =>
        c.nome
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .trim()
          .toLowerCase() === nomeMoto
    );

    const cor = cond?.cor || "#95a5a6";

    const mapaCores: Record<string, string> = {
      vermelho: "#e74c3c",
      verde: "#27ae60",
      azul: "#3498db",
      amarelo: "#f1c40f",
      laranja: "#e67e22",
      roxo: "#9b59b6",
      preto: "#2c3e50",
      branco: "#bdc3c7",
      "pronto para uso": "#27ae60",
      "em manutenção": "#f1c40f",
      "em espera": "#3498db",
      quebrado: "#e74c3c",
    };

    if (!cor.startsWith("#")) {
      return mapaCores[cor.toLowerCase()] || "#95a5a6";
    }

    return cor;
  };

  const confirmarExclusao = (id: number) => {
    Alert.alert("Confirmar", "Deseja realmente excluir esta moto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => handleExcluirMoto(id),
      },
    ]);
  };

  const handleExcluirMoto = async (id: number) => {
    const motoRemovida = motos.find((m) => m.id === id);
    setMotos((prev) => prev.filter((m) => m.id !== id));
    try {
      await api_delete.deleteMoto(id);
    } catch {
      if (motoRemovida) setMotos((prev) => [...prev, motoRemovida]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HeaderLista
        title="Lista de Motos"
        onMenuPress={() => setMenuAberto(true)}
      />

      <MenuLateral
        aberto={menuAberto}
        itens={filteredMenuItems}
        fecharMenu={() => setMenuAberto(false)}
      />

      <TouchableOpacity
        onPress={() => setModalVisivel(true)}
        style={styles.filtroBotao}
      >
        <Text style={[styles.filtroTexto, { color: "black" }]}>
          {filialSelecionada
            ? `Filial: ${filialSelecionada}`
            : "Selecionar Filial"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisivel}
        animationType="fade"
        transparent={false}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <Text style={[styles.modalTitulo, { color: colors.text }]}>
              Escolha uma filial
            </Text>

            {filiais.map((f) => (
              <TouchableOpacity
                key={f}
                onPress={() => {
                  setFilialSelecionada(f);
                  setModalVisivel(false);
                }}
                style={[
                  styles.modalItem,
                  {
                    borderColor:
                      filialSelecionada === f
                        ? colors.primary || "#00b894"
                        : "transparent",
                  },
                ]}
              >
                <Text style={{ color: colors.text }}>{f}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => {
                setFilialSelecionada("");
                setModalVisivel(false);
              }}
              style={styles.modalCancelar}
            >
              <Text style={{ color: "#e74c3c" }}>Limpar Filtro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView style={{ marginTop: 8, paddingHorizontal: 24 }}>
        <AnimatePresence>
          {motos
            .filter((m) => !filialSelecionada || m.filial === filialSelecionada)
            .map((m) => {
              const uwb = getLocalizacaoMoto(m.placa);
              const corCondicao = getCorCondicao(m.condicao);

              return (
                <MotiView
                  key={m.id}
                  from={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: "timing", duration: 300 }}
                  style={[
                    styles.card,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: corCondicao,
                    },
                  ]}
                >
                  <View style={styles.cabecalhoCard}>
                    <View
                      style={[styles.bolinha, { backgroundColor: corCondicao }]}
                    />
                    <Text style={[styles.tituloMoto, { color: colors.text }]}>
                      {m.modelo} ({m.placa})
                    </Text>
                  </View>

                  <Text style={[styles.texto, { color: colors.text }]}>
                    <Text style={styles.label}>Dono: </Text>
                    {m.dono}
                  </Text>
                  <Text style={[styles.texto, { color: colors.text }]}>
                    <Text style={styles.label}>Condição: </Text>
                    {m.condicao}
                  </Text>
                  <Text style={[styles.texto, { color: colors.text }]}>
                    <Text style={styles.label}>Filial: </Text>
                    {m.filial}
                  </Text>

                  {uwb ? (
                    <View>
                      <Text style={[styles.texto, { color: colors.text }]}>
                        <Text style={styles.label}>Tag UWB: </Text>
                        {uwb.codigo} {"\n"}
                        <Text style={styles.label}>Localização: </Text>
                        {uwb.localizacao
                          ? `X: ${uwb.localizacao.xCoord.toFixed(
                              2
                            )} | Y: ${uwb.localizacao.yCoord.toFixed(2)}`
                          : "Sem dados de posição"}
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        router.push({
                          pathname: "/vincularTag",
                          params: { id: m.id, placa: m.placa },
                        })
                      }
                    >
                      <Text
                        style={[
                          styles.texto,
                          { color: colors.primary || "#3498db" },
                        ]}
                      >
                        Vincular tag
                      </Text>
                    </TouchableOpacity>
                  )}

                  <View style={styles.acoes}>
                    <BotaoAnimado
                      label="Editar"
                      onPress={() =>
                        router.push({
                          pathname: "/cadastroMoto",
                          params: { id: m.id },
                        })
                      }
                    />
                    <BotaoAnimado
                      label="Excluir"
                      onPress={() => confirmarExclusao(m.id)}
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

const styles = StyleSheet.create({
  filtroBotao: {
    alignSelf: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
    width: "90%",
    alignItems: "center",
  },
  filtroTexto: {
    fontWeight: "600",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    borderRadius: 16,
    padding: 20,
  },
  modalTitulo: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center",
  },
  modalItem: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  modalCancelar: {
    marginTop: 12,
    alignItems: "center",
  },
  card: {
    borderWidth: 2,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cabecalhoCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  bolinha: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  tituloMoto: {
    fontSize: 16,
    fontWeight: "700",
  },
  texto: {
    fontSize: 14,
    marginTop: 2,
  },
  label: {
    fontWeight: "600",
  },
  acoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});
