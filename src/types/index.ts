// IdealBanking Type Definitions

export type AppRole = 
  | 'ADMIN' 
  | 'GESTOR_LOJA' 
  | 'OPERADOR_LOJA' 
  | 'ANALISTA_CREDITO' 
  | 'FINANCEIRO' 
  | 'AUDITOR';

export type PropostaStatus = 
  | 'RASCUNHO' 
  | 'ENVIADA' 
  | 'EM_ANALISE' 
  | 'PENDENTE_DOC' 
  | 'APROVADA' 
  | 'REPROVADA' 
  | 'CANCELADA' 
  | 'LIQUIDADA';

export type OperacaoStatus = 
  | 'ATIVA' 
  | 'LIQUIDADA' 
  | 'INADIMPLENTE' 
  | 'ESTORNADA';

export type AnexoTipo = 
  | 'DOCUMENTO' 
  | 'COMPROVANTE' 
  | 'OUTROS';

export type AnaliseDecisao = 
  | 'APROVAR' 
  | 'REPROVAR' 
  | 'AJUSTAR';

export type Genero = 
  | 'MASCULINO' 
  | 'FEMININO' 
  | 'OUTRO';

export type EstadoCivil = 
  | 'SOLTEIRO' 
  | 'CASADO' 
  | 'DIVORCIADO' 
  | 'VIUVO' 
  | 'UNIAO_ESTAVEL';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  loja_id?: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  permissoes_json?: Record<string, unknown>;
}

export interface Loja {
  id: string;
  nome_fantasia: string;
  cnpj: string;
  ie?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  cidade?: string;
  uf?: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Proposta {
  id: string;
  // Cliente
  cliente_nome: string;
  cliente_cpf: string;
  cliente_data_nasc?: string;
  cliente_telefone?: string;
  cliente_email?: string;
  cliente_nome_mae?: string;
  cliente_genero?: Genero;
  cliente_estado_civil?: EstadoCivil;
  cliente_cep?: string;
  cliente_endereco?: string;
  cliente_numero?: string;
  cliente_bairro?: string;
  cliente_cidade?: string;
  cliente_estado?: string;
  // Empresa
  empresa_nome?: string;
  empresa_cnpj?: string;
  tempo_carteira_meses?: number;
  salario_base?: number;
  // Proposta
  valor_solicitado: number;
  prazo_meses: number;
  carencia_meses?: number;
  margem_consignavel?: number;
  taxa_aplicada?: number;
  chave_pix_desembolso?: string;
  tipo_contrato?: string;
  data_primeiro_pagamento?: string;
  restricao_serasa_flag?: boolean;
  score_interno?: number;
  observacoes?: string;
  motivo_reprovacao?: string;
  // Relacionamentos
  loja_id?: string;
  usuario_id?: string;
  politica_id?: string;
  // Status
  status: PropostaStatus;
  submitted_at?: string;
  decided_at?: string;
  created_at: string;
  updated_at: string;
  // Relacionamentos expandidos (para UI)
  loja?: Loja;
  usuario?: Usuario;
  politica?: PoliticaComercial;
}

export interface PoliticaComercial {
  id: string;
  nome: string;
  taxa_juros_ao_mes: number;
  prazo_min_meses: number;
  prazo_max_meses: number;
  valor_min: number;
  valor_max: number;
  idade_min?: number;
  idade_max?: number;
  tempo_carteira_min_meses?: number;
  tempo_carteira_max_meses?: number;
  carencia_meses?: number;
  comissao_percent?: number;
  margem_consignavel_percent?: number;
  restricao_serasa_permitida: boolean;
  negativa_fgts_permitida: boolean;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface StatusProposta {
  id: string;
  nome: string;
  descricao?: string;
  cor: string;
  ordem: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface LogStatusProposta {
  id: string;
  proposta_id: string;
  usuario_id: string;
  status_anterior: PropostaStatus;
  status_novo: PropostaStatus;
  observacao?: string;
  data_alteracao: string;
  usuario?: Usuario;
}

export interface AnaliseCredito {
  id: string;
  proposta_id: string;
  analista_id: string;
  decisao: AnaliseDecisao;
  parecer?: string;
  serasa_resultado?: string;
  limite_sugerido?: number;
  taxa_sugerida?: number;
  empresa_tem_negativas?: boolean;
  empresa_qtd_funcionarios?: number;
  checagem_tempo_empresa_meses?: number;
  created_at: string;
  analista?: Usuario;
}

export interface AnaliseCreditoRespostas {
  id: string;
  proposta_id: string;
  usuario_id: string;
  negativa_fgts?: boolean;
  data_fundacao_3anos?: boolean;
  restricao_serasa?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Operacao {
  id: string;
  proposta_id: string;
  valor_contratado: number;
  data_contratacao: string;
  data_liquidacao?: string;
  valor_liquidacao?: number;
  status_operacao: OperacaoStatus;
  motivo_nao_liquidacao?: string;
  created_at: string;
  updated_at: string;
  proposta?: Proposta;
}

export interface AnexoProposta {
  id: string;
  proposta_id: string;
  uploaded_by: string;
  file_url: string;
  tipo: AnexoTipo;
  created_at: string;
}

export interface Auditoria {
  id: string;
  usuario_id: string;
  entidade: string;
  entidade_id: string;
  acao: string;
  diff_json?: Record<string, unknown>;
  created_at: string;
  usuario?: Usuario;
}

// Dashboard Stats
export interface DashboardStats {
  totalPropostas: number;
  emAnalise: number;
  aprovadas: number;
  reprovadas: number;
  carteiraAtiva: number;
  taxaAprovacao: number;
}

// Relatório Filters
export interface RelatorioFilters {
  dataDigitacaoInicio?: string;
  dataDigitacaoFim?: string;
  dataMudancaStatusInicio?: string;
  dataMudancaStatusFim?: string;
  lojaId?: string;
  usuarioId?: string;
  status?: PropostaStatus;
}
