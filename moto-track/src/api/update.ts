import { API_BASE_URL } from "../api/api_base";
import { Condicao, MotoCreate } from "../../types/moto";

const updateMoto = async (id: number, dados: MotoCreate) => {
  try {
    const response = await fetch(`${API_BASE_URL}motos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erro ao atualizar: ${text}`);
    }

    const updatedMoto = await response.json();
    return updatedMoto;
  } catch (err) {
    console.error("Erro ao atualizar moto:", err);
    throw err;
  }
};

const updateCondicao = async (id: number, dados: Condicao) => {
  try {
    const response = await fetch(`${API_BASE_URL}condicoes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erro ao atualizar condição: ${text}`);
    }
    const updatedCondicao = await response.json();
    return updatedCondicao;
  } catch (err) {
    console.error("Erro ao atualizar condição:", err);
    throw err;
  }
};

const updateUwb = async (
  id: number,
  codigo: string,
  idMoto: number | null,
  statusAtual?: boolean
) => {
  try {
    // alterna o status (true → false / false → true)
    const novoStatus = !statusAtual;

    const body = {
      codigo,
      status: novoStatus,
      idMoto: novoStatus ? idMoto : null, // se inativar, remove o vínculo
    };

    console.log("➡️ Enviando atualização UWB:", body);

    const response = await fetch(`${API_BASE_URL}tags/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erro ao atualizar tag UWB: ${text}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Erro ao atualizar UWB:", err);
    throw err;
  }
};

export const api_update = {
  updateMoto,
  updateCondicao,
  updateUwb,
};
