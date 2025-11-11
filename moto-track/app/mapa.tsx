import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  Button,
  Alert,
  PanResponder,
} from "react-native";
import { api } from "~/src/api/fetch";

const MAP_WIDTH = 10;
const MAP_HEIGHT = 10;

interface Localizacao {
  xCoord: number;
  yCoord: number;
}

interface Tag {
  id: number;
  codigo: string;
  localizacao?: Localizacao;
  moto?: string;
  status?: string;
}

interface Moto {
  id: string;
  placa: string;
  modelo: string;
  condicao: string;
  dono: string;
  filial: string;
}

const PatioPlanta = () => {
  const [anchors, setAnchors] = useState([
    { id: "A1", x: 1.2, y: 1.0 },
    { id: "A2", x: 9.0, y: 1.0 },
    { id: "A3", x: 1.2, y: 8.0 },
  ]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedMoto, setSelectedMoto] = useState<Moto | null>(null);
  const [loading, setLoading] = useState(false);

  // Atualiza periodicamente as tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(
          "https://ping-mottu.azurewebsites.net/api/tags"
        );
        const data = await response.json();
        setTags(data.content || []);
      } catch (error) {
        console.error("Erro ao buscar tags:", error);
      }
    };

    fetchTags();
    const interval = setInterval(fetchTags, 1000);
    return () => clearInterval(interval);
  }, []);

  const isInsideArea = (x: number, y: number) => {
    const minX = Math.min(...anchors.map((a) => a.x));
    const maxX = Math.max(...anchors.map((a) => a.x));
    const minY = Math.min(...anchors.map((a) => a.y));
    const maxY = Math.max(...anchors.map((a) => a.y));
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  };

  const addAnchor = () => {
    const nextId = `A${anchors.length + 1}`;
    const randomX = parseFloat((Math.random() * MAP_WIDTH).toFixed(1));
    const randomY = parseFloat((Math.random() * MAP_HEIGHT).toFixed(1));
    setAnchors([...anchors, { id: nextId, x: randomX, y: randomY }]);
  };

  const handleMotoPress = async (tag: Tag) => {
    if (!tag.moto) {
      Alert.alert(
        "Tag não vinculada",
        "Esta tag não está vinculada a uma moto."
      );
      return;
    }
    setLoading(true);
    try {
      const motoData = await api.fetchMotos();
      const moto = motoData.content.find((m: Moto) => m.placa === tag.moto);
      setSelectedMoto(moto || null);
    } catch (error) {
      console.error("Erro ao buscar moto:", error);
    } finally {
      setLoading(false);
    }
  };

  const createPanResponder = (anchorId: string) => {
    let startX = 0;
    let startY = 0;

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      // Guarda a posição inicial quando o toque começa
      onPanResponderGrant: () => {
        const anchor = anchors.find((a) => a.id === anchorId);
        if (anchor) {
          startX = anchor.x;
          startY = anchor.y;
        }
      },

      // Atualiza conforme o dedo se move
      onPanResponderMove: (_, gestureState) => {
        setAnchors((prevAnchors) =>
          prevAnchors.map((a) =>
            a.id === anchorId
              ? {
                  ...a,
                  x: Math.min(
                    Math.max(startX + (gestureState.dx / 300) * MAP_WIDTH, 0),
                    MAP_WIDTH
                  ),
                  y: Math.min(
                    Math.max(startY + (gestureState.dy / 300) * MAP_HEIGHT, 0),
                    MAP_HEIGHT
                  ),
                }
              : a
          )
        );
      },
    });
  };

  const anchorRefs = useRef<Record<string, any>>({});

  const tagsAtivas = tags.filter((t) => t.moto && t.localizacao);
  const tagsInativas = tags.filter((t) => !t.moto);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa de Localização UWB</Text>

      <Button title="Adicionar Âncora" onPress={addAnchor} color="#007AFF" />

      <ImageBackground
        source={require("../assets/mapa-patio.png")}
        style={styles.map}
        resizeMode="contain"
      >
        {/* Âncoras */}
        {anchors.map((a) => {
          const panResponder =
            anchorRefs.current[a.id] ||
            (anchorRefs.current[a.id] = createPanResponder(a.id));
          return (
            <View
              key={a.id}
              {...panResponder.panHandlers}
              style={[
                styles.anchor,
                {
                  left: `${(a.x / MAP_WIDTH) * 100}%`,
                  top: `${(a.y / MAP_HEIGHT) * 100}%`,
                },
              ]}
            >
              <Text style={styles.anchorText}>{a.id}</Text>
            </View>
          );
        })}

        {/* Tags de motos */}
        {tagsAtivas.map((t) => {
          const dentro = t.localizacao
            ? isInsideArea(t.localizacao.xCoord, t.localizacao.yCoord)
            : false;

          const x = t.localizacao?.xCoord ?? 0;
          const y = t.localizacao?.yCoord ?? 0;

          return (
            <TouchableOpacity
              key={t.id}
              style={[
                styles.tag,
                {
                  left: `${(x / MAP_WIDTH) * 100}%`,
                  top: `${(y / MAP_HEIGHT) * 100}%`,
                },
              ]}
              onPress={() => handleMotoPress(t)}
            >
              <Image
                source={require("../assets/moto.png")}
                style={[styles.motoImage, { opacity: dentro ? 1 : 0.5 }]}
              />
              {!dentro && <Text style={styles.outsideText}>⚠️</Text>}
            </TouchableOpacity>
          );
        })}
      </ImageBackground>

      {/* Tags inativas */}
      <View style={styles.inactiveArea}>
        <Text style={styles.inactiveTitle}>Tags Inativas</Text>
        {tagsInativas.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma tag inativa</Text>
        ) : (
          tagsInativas.map((t) => (
            <Text key={t.id} style={styles.inactiveTag}>
              {t.id} - {t.codigo || "Sem código"} ❌
            </Text>
          ))
        )}
      </View>

      {/* Modal de Moto */}
      <Modal
        visible={!!selectedMoto}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedMoto(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {loading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : (
              <ScrollView>
                <Text style={styles.modalTitle}>Dados da Moto</Text>
                <Text>ID: {selectedMoto?.id}</Text>
                <Text>Placa: {selectedMoto?.placa}</Text>
                <Text>Modelo: {selectedMoto?.modelo}</Text>
                <Text>Condição: {selectedMoto?.condicao}</Text>
                <Text>Dono: {selectedMoto?.dono}</Text>
                <Text>Filial: {selectedMoto?.filial}</Text>
                <TouchableOpacity
                  onPress={() => setSelectedMoto(null)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeText}>Fechar</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PatioPlanta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    paddingTop: 40,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  map: {
    width: "95%",
    height: 420,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginTop: 10,
  },
  anchor: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
  },
  anchorText: { color: "white", fontWeight: "bold", fontSize: 10 },
  tag: { position: "absolute", alignItems: "center" },
  motoImage: { width: 28, height: 28 },
  outsideText: { position: "absolute", top: -14, fontSize: 12, color: "red" },
  inactiveArea: {
    marginTop: 20,
    width: "95%",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
  },
  inactiveTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  inactiveTag: { color: "#999", fontSize: 14 },
  emptyText: { color: "#bbb", fontStyle: "italic" },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },
  closeButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  closeText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
