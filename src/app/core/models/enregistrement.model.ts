export type EnregistrementCreate = {
  numero_serie: string;
  marque: string;
  nom_proprietaire: string;
  telephone: string;
  date_visite?: string | null; // ISO string
  reparation: string;
};

export interface EnregistrementOut {
  id_voiture: number;
  id_reparation: number; // ✅
  numero_serie: string;
  marque: string;
  nom_proprietaire: string;
  telephone: string;
  date_visite: string;
  reparation: string;
};
