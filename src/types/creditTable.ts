export interface PrazoFaixa {
  id: string;
  prazo_min: number;
  prazo_max: number;
  taxa: string;
}

export interface CreditTable {
  id: string;
  nome: string;
  ativa: boolean;
  idade_min: number;
  idade_max: number;
  prazo_min: number;
  prazo_max: number;
  taxa: string;
  tempo_clt_meses: number;
  tempo_empresa_anos: number;
  negativa_fgts: boolean;
  faixas_prazo: PrazoFaixa[];
}

export interface ComissaoConfig {
  comissao_vendedor: string;
  comissao_gerente: string;
  comissao_loja: string;
}
