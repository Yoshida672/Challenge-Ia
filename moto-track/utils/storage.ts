import AsyncStorage from "@react-native-async-storage/async-storage";
import { Moto } from "../types/moto";

const STORAGE_KEY = "@motos";

export async function salvarMoto(moto: Moto) {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    const motos: Moto[] = json ? JSON.parse(json) : [];

    motos.push(moto);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(motos));
  } catch (error) {
    console.error("Erro ao salvar a moto:", error);
  }
}

export async function buscarMotos(): Promise<Moto[]> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error("Erro ao buscar as motos:", error);
    return [];
  }
}

export async function removerMoto(id: string): Promise<void> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    const motos: Moto[] = json ? JSON.parse(json) : [];

    const motosAtualizadas = motos.filter((m) => m.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(motosAtualizadas));
  } catch (error) {
    console.error("Erro ao remover a moto:", error);
  }
}

export async function excluirMotoStorage(id: string) {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    let motos: Moto[] = json ? JSON.parse(json) : [];
    motos = motos.filter((m) => m.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(motos));
  } catch (error) {
    console.error('Erro ao excluir a moto:', error);
  }
}
