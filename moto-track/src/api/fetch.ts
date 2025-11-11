import { API_BASE_URL } from "../api/api_base";

async function fetchCondicoes() {
  try {
    const response = await fetch(`${API_BASE_URL}condicoes`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching condicoes:", error);
    throw error;
  }
}

async function fetchFiliais() {
  try {
    const response = await fetch(`${API_BASE_URL}filiais`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching filiais:", error);
    throw error;
  }
}
async function fetchModelos() {
  try {
    const response = await fetch(`${API_BASE_URL}modelos`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching modelos:", error);
    throw error;
  }
}
async function fetchMotos() {
  try {
    const response = await fetch(`${API_BASE_URL}motos`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching motos:", error);
    throw error;
  }
}
async function fetchPatios() {
  try {
    const response = await fetch(`${API_BASE_URL}patios`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching patios:", error);
    throw error;
  }
}

async function fetchtags() {
  try {
    const response = await fetch(`${API_BASE_URL}tags`);
    const data = await response.json();
    return data.content || [];
  } catch (error) {
    console.error("Erro ao buscar tags:", error);
    throw error;
  }
}

export const api = {
  fetchCondicoes,
  fetchFiliais,
  fetchModelos,
  fetchMotos,
  fetchPatios,
  fetchtags,
};
