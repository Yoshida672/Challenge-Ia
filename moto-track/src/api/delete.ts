import { API_BASE_URL } from "../api/api_base";

export const deleteMoto = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}motos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erro ao deletar: ${text}`);
  }

  return;
};

export const deleteCondicao = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}condicoes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erro ao deletar condição: ${text}`);
  }
};

export const api_delete = {
  deleteMoto,
  deleteCondicao,
};
