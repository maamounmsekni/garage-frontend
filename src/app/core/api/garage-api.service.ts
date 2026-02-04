import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EnregistrementCreate, EnregistrementOut } from '../models/enregistrement.model';

@Injectable({ providedIn: 'root' })
export class GarageApiService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  createEnregistrement(data: EnregistrementCreate) {
    return this.http.post<EnregistrementOut>(`${this.base}/enregistrements`, data);
  }
listEnregistrements(limit = 10, q?: string) {
  const qs = q ? `&q=${encodeURIComponent(q)}` : '';
  return this.http.get<EnregistrementOut[]>(`${this.base}/enregistrements?limit=${limit}${qs}`);
}



  searchEnregistrementsByNumeroSerie(numero_serie: string) {
    return this.http.get<EnregistrementOut[]>(
      `${this.base}/enregistrements/by-numero-serie/${encodeURIComponent(numero_serie)}`
    );
  }

  updateVoiture(numero_serie: string, payload: { marque?: string; nom_proprietaire?: string; telephone?: string }) {
    return this.http.put(`${this.base}/voitures/by-numero-serie/${encodeURIComponent(numero_serie)}`, payload);
  }

  updateReparation(id: number, payload: any) {
    return this.http.put(`${this.base}/reparations/${id}`, payload);
  }

  deleteReparation(id: number) {
    return this.http.delete(`${this.base}/reparations/${id}`);
  }

  deleteVoiture(numero_serie: string) {
    return this.http.delete(`${this.base}/voitures/by-numero-serie/${encodeURIComponent(numero_serie)}`);
  }
}
