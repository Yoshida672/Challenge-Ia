import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "~/src/context/ThemeContext";
import { api_update } from "~/src/api/update";
import { api } from "~/src/api/fetch";
import { useSearchParams } from "expo-router/build/hooks";

export default function VincularTag() {
  const { colors } = useTheme();
  const router = useRouter();
  const params = useSearchParams();

  const idMoto = Number(params.get("id"));
  const placa = params.get("placa") as string;
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const carregarTags = async () => {
    try {
      const data = await api.fetchtags();
      const lista = data.content || data;
      const tagsDisponiveis = lista.filter((t: any) => t.status !== "Ativa");
      setTags(tagsDisponiveis);
    } catch (error) {
      console.error("Erro ao carregar tags:", error);
      Alert.alert("Erro", "Não foi possível carregar as tags disponíveis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTags();
  }, []);

  const handleVincular = async (tag: any) => {
    console.log("🔗 Alternando vínculo da tag:", tag.codigo);

    try {
      await api_update.updateUwb(tag.id, tag.codigo, idMoto, tag.status);
      Alert.alert(
        "Sucesso",
        tag.status === "Ativa"
          ? `Tag ${tag.codigo} foi desvinculada da moto ${placa}.`
          : `Tag ${tag.codigo} vinculada à moto ${placa}!`
      );
      carregarTags(); // 🔁 atualiza lista sem precisar voltar
    } catch (error) {
      console.error("Erro ao atualizar tag:", error);
      Alert.alert("Erro", "Falha ao alterar o vínculo da tag.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary || "#3498db"} />
        <Text style={{ color: colors.text, marginTop: 12 }}>
          Carregando tags...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Gerenciar Tag</Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>
        Moto: {placa}
      </Text>

      {tags.length === 0 ? (
        <Text style={{ color: colors.text, marginTop: 20 }}>
          Nenhuma tag encontrada.
        </Text>
      ) : (
        <ScrollView style={{ width: "100%", marginTop: 12 }}>
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag.id}
              style={[
                styles.tagItem,
                {
                  borderColor: tag.moto
                    ? "#e74c3c"
                    : colors.primary || "#3498db",
                },
              ]}
              onPress={() => handleVincular(tag)}
            >
              <Text style={[styles.tagText, { color: colors.text }]}>
                Código: {tag.codigo}
              </Text>
              <Text style={[styles.tagSub, { color: colors.text }]}>
                Status: {tag.status}
              </Text>
              <Text
                style={[
                  styles.tagVinculo,
                  { color: tag.moto ? "#e74c3c" : "#27ae60" },
                ]}
              >
                {tag.moto
                  ? `Vinculada à moto ${tag.moto}`
                  : "Disponível para vincular"}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  tagItem: {
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  tagText: {
    fontSize: 16,
    fontWeight: "600",
  },
  tagSub: {
    fontSize: 14,
    opacity: 0.8,
  },
  tagVinculo: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
});
