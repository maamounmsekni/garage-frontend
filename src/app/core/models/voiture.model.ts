export type Voiture = {
  id: number;
  id_proprietaire: number;
  id_type_voiture: number;
  matricule: string;
  remarques?: string | null;
  cree_le: string; // ISO date string
};
