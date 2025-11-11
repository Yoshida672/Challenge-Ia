import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useTheme } from "~/src/context/ThemeContext";
import { MotiView } from "moti";
import { PatioResponse, CondicaoResponse } from "~/types/uwb";

interface FormularioMotoProps {
  placa: string;
  setPlaca: (value: string) => void;
  dono: string;
  setDono: (value: string) => void;
  modelo: string;
  setModelo: (value: string) => void;
  patio: string;
  setPatio: (value: string) => void;
  condicao: string;
  setCondicao: (value: string) => void;
  modelos: string[];
  patios: PatioResponse[];
  condicoes: CondicaoResponse[];
  isEditing: boolean;
}

export default function FormularioMoto({
  placa,
  setPlaca,
  dono,
  setDono,
  modelo,
  setModelo,
  patio,
  setPatio,
  condicao,
  setCondicao,
  modelos,
  patios,
  condicoes,
  isEditing,
}: FormularioMotoProps) {
  const { colors } = useTheme();

  const [modalModelo, setModalModelo] = useState(false);
  const [modalPatio, setModalPatio] = useState(false);
  const [modalCondicao, setModalCondicao] = useState(false);

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

  const getColorHex = (nome: string | undefined) =>
    nome ? mapaCores[nome.toLowerCase()] || "#999" : "#999";

  const condicaoSelecionada = condicoes.find(
    (c) => c.id.toString() === condicao
  );
  const patioSelecionado = patios.find((p) => p.id.toString() === patio);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", delay: 200 }}
    >
      <Text style={[styles.titulo, { color: colors.text }]}>
        Preencha os dados da moto
      </Text>

      <Text style={[styles.label, { color: colors.text }]}>Placa:</Text>
      <TextInput
        value={placa.toUpperCase()}
        onChangeText={setPlaca}
        placeholder="Placa"
        placeholderTextColor={colors.text}
        style={[
          styles.input,
          { color: colors.text, backgroundColor: colors.inputBackground },
        ]}
        editable={!isEditing}
      />

      <Text style={[styles.label, { color: colors.text }]}>Dono:</Text>
      <TextInput
        value={dono}
        onChangeText={setDono}
        placeholder="Dono"
        placeholderTextColor={colors.text}
        style={[
          styles.input,
          { color: colors.text, backgroundColor: colors.inputBackground },
        ]}
        editable={!isEditing}
      />

      <Text style={[styles.label, { color: colors.text }]}>
        Selecione um Modelo:
      </Text>
      <TouchableOpacity
        style={[styles.picker, { backgroundColor: colors.inputBackground }]}
        onPress={() => setModalModelo(true)}
        disabled={isEditing}
      >
        <Text style={{ color: colors.text }}>
          {modelo || "Selecione um modelo..."}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.label, { color: colors.text }]}>
        Selecione um Pátio:
      </Text>
      <TouchableOpacity
        style={[styles.picker, { backgroundColor: colors.inputBackground }]}
        onPress={() => setModalPatio(true)}
      >
        <Text style={{ color: colors.text }}>
          {patioSelecionado
            ? `Área: ${patioSelecionado.area}m² | Capacidade: ${patioSelecionado.capacidadeMax}`
            : "Selecione um pátio..."}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.label, { color: colors.text }]}>
        Selecione uma Condição:
      </Text>
      <TouchableOpacity
        style={[
          styles.picker,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: colors.inputBackground,
          },
        ]}
        onPress={() => setModalCondicao(true)}
      >
        <Text style={{ color: colors.text }}>
          {condicaoSelecionada
            ? condicaoSelecionada.nome
            : "Selecione uma condição..."}
        </Text>
        {condicaoSelecionada && (
          <View
            style={[
              styles.corPreview,
              { backgroundColor: getColorHex(condicaoSelecionada.cor) },
            ]}
          />
        )}
      </TouchableOpacity>

      <Modal
        visible={modalModelo}
        animationType="slide"
        onRequestClose={() => setModalModelo(false)}
      >
        <View
          style={[styles.modalFundo, { backgroundColor: colors.background }]}
        >
          <View style={styles.modalConteudo}>
            <Text style={styles.modalTitulo}>Escolha um Modelo</Text>
            <ScrollView>
              {modelos.map((m) => (
                <TouchableOpacity
                  key={m}
                  onPress={() => {
                    setModelo(m);
                    setModalModelo(false);
                  }}
                  style={styles.opcao}
                >
                  <Text style={{ color: "black" }}>{m}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.botaoFechar}
              onPress={() => setModalModelo(false)}
            >
              <Text style={styles.textoBotaoFechar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalPatio}
        animationType="slide"
        onRequestClose={() => setModalPatio(false)}
      >
        <View
          style={[styles.modalFundo, { backgroundColor: colors.background }]}
        >
          <View style={styles.modalConteudo}>
            <Text style={styles.modalTitulo}>Escolha um Pátio</Text>
            <ScrollView>
              {patios.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  onPress={() => {
                    setPatio(p.id.toString());
                    setModalPatio(false);
                  }}
                  style={styles.opcao}
                >
                  <Text style={{ color: "black" }}>
                    Área: {p.area}m² | Capacidade: {p.capacidadeMax}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.botaoFechar}
              onPress={() => setModalPatio(false)}
            >
              <Text style={styles.textoBotaoFechar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalCondicao}
        animationType="slide"
        onRequestClose={() => setModalCondicao(false)}
      >
        <View
          style={[styles.modalFundo, { backgroundColor: colors.background }]}
        >
          <View style={styles.modalConteudo}>
            <Text style={styles.modalTitulo}>Escolha uma Condição</Text>
            <ScrollView>
              {condicoes.map((c) => (
                <TouchableOpacity
                  key={c.id}
                  onPress={() => {
                    setCondicao(c.id.toString());
                    setModalCondicao(false);
                  }}
                  style={[
                    styles.opcao,
                    { flexDirection: "row", alignItems: "center" },
                  ]}
                >
                  <View
                    style={[
                      styles.corPreview,
                      { backgroundColor: getColorHex(c.cor), marginRight: 12 },
                    ]}
                  />
                  <Text style={{ color: "black" }}>{c.nome}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.botaoFechar}
              onPress={() => setModalCondicao(false)}
            >
              <Text style={styles.textoBotaoFechar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  corPreview: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  modalFundo: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  modalConteudo: {
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
    backgroundColor: "#fff",
    elevation: 10,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  opcao: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  botaoFechar: {
    marginTop: 16,
    alignSelf: "center",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  textoBotaoFechar: {
    color: "#fff",
    fontWeight: "600",
  },
});
