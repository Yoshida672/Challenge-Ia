import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useTheme } from "~/src/context/ThemeContext";
import MenuLateral from "~/src/components/MenuLateral";
import FormularioMoto from "~/src/components/moto/FormularioMoto";
import BotaoCadastro from "~/src/components/BotaoCadastro";
import { api } from "~/src/api/fetch";
import { api_create } from "~/src/api/create";
import { api_by_id } from "~/src/api/fetchById";
import { api_update } from "~/src/api/update";
import { PatioResponse, CondicaoResponse } from "~/types/uwb";
import HeaderCadastro from "~/src/components/moto/HeaderCadastro";
import { menuItems } from "~/types/MenuItems";
import { enviarNotificacao } from "~/src/api/useNotifications";
export default function CadastroMoto() {
  const { colors } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditing = Boolean(id);

  const [menuAberto, setMenuAberto] = useState(false);
  const itensMenu = menuItems.filter(
    (item) => !item.onlyLoggedOut || item.onlyLoggedIn
  );

  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [dono, setDono] = useState("");
  const [patio, setPatio] = useState("");
  const [condicao, setCondicao] = useState("");

  const [modelos, setModelos] = useState<string[]>([]);
  const [patios, setPatios] = useState<PatioResponse[]>([]);
  const [condicoes, setCondicoes] = useState<CondicaoResponse[]>([]);

  useEffect(() => {
    api.fetchPatios().then((data) => setPatios(data.content));
    api.fetchModelos().then((data) => setModelos(data));
    api.fetchCondicoes().then((data) => setCondicoes(data.content));
  }, []);

  useEffect(() => {
    if (isEditing && id) {
      api_by_id.fetchMotoById(Number(id)).then((moto) => {
        setModelo(moto.modelo);
        setPlaca(moto.placa);
        setDono(moto.dono);
        setPatio(moto.patioId.toString());
        setCondicao(moto.condicaoId.toString());
      });
    }
  }, [id]);

  const handleCadastro = async () => {
    const placaRegex = /^[A-Z]{3}\d[A-Z0-9]\d{2}$|^[A-Z]{3}-\d{4}$/;
    if (!isEditing) {
      if (!modelo || !dono || !placa || !patio || !condicao) {
        Alert.alert("Atenção", "Preencha todos os campos!");
        return;
      }

      if (!placaRegex.test(placa.toUpperCase())) {
        Alert.alert(
          "Erro",
          "Placa inválida! Use o formato ABC1D23 ou AAA-1234"
        );
        return;
      }
    }

    try {
      const motoData = {
        placa,
        dono,
        modelo,
        condicaoId: Number(condicao),
        patioId: Number(patio),
      };

      if (id) {
        await api_update.updateMoto(Number(id), motoData);
        Alert.alert("Sucesso", "Moto atualizada com sucesso!");
      } else {
        const response = await api_create.createMoto(motoData);
        Alert.alert(
          "Sucesso",
          `Moto cadastrada com sucesso! ID: ${response.id}`
        );

        enviarNotificacao(
          "Nova moto cadastrada",
          `Modelo: ${modelo}, Placa: ${placa}`
        );
      }

      router.push("/listaMotos");
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível salvar a moto.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <MenuLateral
        aberto={menuAberto}
        itens={itensMenu}
        fecharMenu={() => setMenuAberto(false)}
      />

      <HeaderCadastro
        titulo="Cadastro de Moto"
        onMenuPress={() => setMenuAberto(true)}
      />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <FormularioMoto
          placa={placa}
          setPlaca={setPlaca}
          dono={dono}
          setDono={setDono}
          modelo={modelo}
          setModelo={setModelo}
          patio={patio}
          setPatio={setPatio}
          condicao={condicao}
          setCondicao={setCondicao}
          modelos={modelos}
          patios={patios}
          condicoes={condicoes}
          isEditing={isEditing}
        />
        <BotaoCadastro
          onPress={handleCadastro}
          isEditing={isEditing}
          label="Cadastrar Moto"
          labelEdit="Atualizar Moto"
        />
      </ScrollView>
    </View>
  );
}
