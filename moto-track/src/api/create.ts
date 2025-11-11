import { API_BASE_URL } from "../api/api_base";
import { Condicao, Moto, MotoCreate } from "../../types/moto";

async function createMoto(moto: MotoCreate): Promise<Moto> {
  try {
    const response = await fetch(`${API_BASE_URL}motos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(moto),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Erro ao cadastrar moto");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating moto:", error);
    throw error;
  }
}

export async function createCondicao(data: Condicao) {
  try {
    const response = await fetch(`${API_BASE_URL}condicoes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao cadastrar condição");
    return await response.json();
  } catch (error) {
    console.error("Error creating condicao:", error);
    throw error;
  }
}

export const api_create = {
  createMoto,
  createCondicao,
};
