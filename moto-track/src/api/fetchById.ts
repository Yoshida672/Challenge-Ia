import { API_BASE_URL } from "../api/api_base";

async function fetchFilialById(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}filiais/${id}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Erro ao buscar filial");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching filial with id ${id}:`, error);
    throw error;
  }
}
async function fetchMotoById(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}motos/${id}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Erro ao buscar moto");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching moto with id ${id}:`, error);
    throw error;
  }
}
async function fetchTagById(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}tags/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar tag");
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar tag ${id}:`, error);
    throw error;
  }
}
async function fetchCondicaoById(id: number) {
  try {
    const responser = await fetch(`${API_BASE_URL}condicoes/${id}`);
    if (!responser.ok) throw new Error("Erro ao buscar condição pelo id" + id);
    return await responser.json();
  } catch (error) {
    console.error(`Erro ao buscar condição ${id}:`, error);
    throw error;
  }
}

export const api_by_id = {
  fetchFilialById,
  fetchMotoById,
  fetchTagById,
  fetchCondicaoById,
};
