export type Reparation = {
  id: number;
  id_voiture: number;
  date_visite: string; // ISO date string
  probleme_signale: string;
  diagnostic?: string | null;
  reparation_effectuee: string;
  prix?: number | null;
  statut: 'EN_COURS' | 'TERMINEE' | 'ANNULEE' | string; // backend returns string
  cree_le: string; // ISO date string
};
