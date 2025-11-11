import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useTheme } from "~/src/context/ThemeContext";
import MenuLateral from "~/src/components/MenuLateral";
import HeaderCadastro from "~/src/components/moto/HeaderCadastro";
import FormularioCondicoes from "~/src/components/condicao/FormularioCondicoes";
import BotaoCadastro from "~/src/components/BotaoCadastro";
import { menuItems } from "~/types/MenuItems";
import { api_create } from "~/src/api/create";
import { api_update } from "~/src/api/update";
import { api_by_id } from "~/src/api/fetchById";
import { api } from "~/src/api/fetch";
import { enviarNotificacao } from "~/src/api/useNotifications";

export default function CadastroCondicoes() {
  const { colors } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditing = Boolean(id);

  const [menuAberto, setMenuAberto] = useState(false);
  const itensMenu = menuItems.filter(
    (item) => !item.onlyLoggedOut || item.onlyLoggedIn
  );

  const [nome, setNome] = useState("");
  const [cor, setCor] = useState("");

  useEffect(() => {
    if (isEditing && id) {
      api_by_id.fetchCondicaoById(Number(id)).then((condicao) => {
        setNome(condicao.nome);
        setCor(condicao.cor);
      });
    }
  }, [id]);

  const handleCadastro = async () => {
    if (!nome || !cor) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      const condicaoData = { nome, cor };

      if (isEditing && id) {
        await api_update.updateCondicao(Number(id), condicaoData);
        Alert.alert("Sucesso", "Condição atualizada com sucesso!");
      } else {
        const response = await api_create.createCondicao(condicaoData);
        Alert.alert(
          "Sucesso",
          `Condição cadastrada com sucesso! ID: ${response.id}`
        );
      }
      enviarNotificacao(
        "Nova Condicao cadastrada",
        `Nome: ${nome}, Cor: ${cor}`
      );
      router.push("/listaCondicoes");
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível salvar a condição.");
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
        titulo={isEditing ? "Editar Condição" : "Cadastro de Condição"}
        onMenuPress={() => setMenuAberto(true)}
      />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <FormularioCondicoes
          nome={nome}
          setNome={setNome}
          cor={cor}
          setCor={setCor}
          isEditing={isEditing}
        />
        <BotaoCadastro
          onPress={handleCadastro}
          isEditing={isEditing}
          label="Cadastrar Condição"
          labelEdit="Atualizar Condição"
        />
      </ScrollView>
    </View>
  );
}
