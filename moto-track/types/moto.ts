export interface Moto {
  id: number;
  placa: string;
  dono: string;
  modelo: string;
  condicao: string;
  condicaoId: number;
  patioId: number;
  patio: string;
  filial: string;
  uwbtag?: string;
  link?: {
    rel: string;
    href: string;
  };
}

export interface MotoCreate {
  placa: string;
  modelo: string;
  condicaoId: number;
  patioId: number;
  dono: string;
}

export interface Condicao {
  id?: number;
  nome: string;
  cor: string;
}
