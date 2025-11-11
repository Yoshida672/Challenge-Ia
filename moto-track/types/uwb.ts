interface Localizacao {
  id: number;
  timestampFormatado: string;
  xCoord: number;
  yCoord: number;
}

export interface UwbResponse {
  id: number;
  codigo: string;
  status: boolean;
  moto: string | null;
  localizacao: Localizacao | null;
  link: any;
}
export interface PatioResponse {
  id: number;
  qtdMoto: number;
  area: number;
  capacidadeMax: number;
  filialId: number;
  filialNome: string;
}

export interface CondicaoResponse {
  id: number;
  nome: string;
  cor: string;
}
