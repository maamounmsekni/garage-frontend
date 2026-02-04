import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GarageApiService } from '../../core/api/garage-api.service';
import { EnregistrementCreate, EnregistrementOut } from '../../core/models/enregistrement.model';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historique.page.html',
  styleUrl: './historique.page.css',
})
export class HistoriquePage implements OnInit {
  numeroSerieSearch = '';
  loading = false;
  error = '';

  rows: EnregistrementOut[] = [];

  showForm = false;

  editing = false;
  editingReparationId: number | null = null;
  editingNumeroSerie = '';

  addingVisit = false;
  visitNumeroSerie = '';

  form: EnregistrementCreate = {
    numero_serie: '',
    marque: '',
    nom_proprietaire: '',
    telephone: '',
    date_visite: null,
    reparation: '',
  };

  constructor(private api: GarageApiService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  private resetModes() {
    this.editing = false;
    this.editingReparationId = null;
    this.editingNumeroSerie = '';

    this.addingVisit = false;
    this.visitNumeroSerie = '';
  }

  private resetForm() {
    this.form = {
      numero_serie: '',
      marque: '',
      nom_proprietaire: '',
      telephone: '',
      date_visite: null,
      reparation: '',
    };
  }

  private sortRowsByNewest() {
    // ✅ sort by date_visite DESC then id_reparation DESC
    this.rows = [...(this.rows || [])].sort((a, b) => {
      const tb = new Date(b.date_visite).getTime() || 0;
      const ta = new Date(a.date_visite).getTime() || 0;

      if (tb !== ta) return tb - ta;

      // tie-breaker (important when same day)
      return (b.id_reparation || 0) - (a.id_reparation || 0);
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.error = '';
    if (!this.showForm) {
      this.resetModes();
      this.resetForm();
    }
  }

  cancelForm() {
    this.resetModes();
    this.resetForm();
    this.showForm = false;
    this.error = '';
  }

  loadAll() {
    this.error = '';
    this.loading = true;

    // backend already limits + sorts, but we sort again safely
    this.api.listEnregistrements(10).subscribe({
      next: (res) => {
        this.rows = res || [];
        this.sortRowsByNewest();
        this.loading = false;
      },
      error: (e) => {
        this.rows = [];
        this.loading = false;
        this.error = e?.error?.detail || 'Erreur chargement';
      },
    });
  }

 search() {
  const q = this.numeroSerieSearch.trim();

  this.loading = true;
  this.api.listEnregistrements(10, q || undefined).subscribe({
    next: (res) => {
      this.rows = res || [];
      this.loading = false;
    },
    error: (e) => {
      this.rows = [];
      this.loading = false;
      this.error = e?.error?.detail || 'Erreur recherche';
    },
  });
}


  startEdit(r: EnregistrementOut) {
    this.error = '';
    this.showForm = true;
    this.resetModes();

    this.editing = true;
    this.editingReparationId = r.id_reparation;
    this.editingNumeroSerie = r.numero_serie;

    this.form = {
      numero_serie: r.numero_serie,
      marque: r.marque,
      nom_proprietaire: r.nom_proprietaire,
      telephone: r.telephone,
      date_visite: r.date_visite ? new Date(r.date_visite).toISOString().slice(0, 10) : null,
      reparation: r.reparation,
    };
  }

  startVisit(r: EnregistrementOut) {
    this.error = '';
    this.showForm = true;
    this.resetModes();

    this.addingVisit = true;
    this.visitNumeroSerie = r.numero_serie;

    // keep old info hidden (backend schema needs them)
    this.form = {
      numero_serie: r.numero_serie,
      marque: r.marque || '',
      nom_proprietaire: r.nom_proprietaire || '',
      telephone: r.telephone || '',
      date_visite: null,
      reparation: '',
    };
  }

  deleteRow(r: EnregistrementOut) {
    this.error = '';
    if (!confirm('Supprimer cet enregistrement ?')) return;

    this.loading = true;
    this.api.deleteReparation(r.id_reparation).subscribe({
      next: () => {
        this.loading = false;
        if (this.numeroSerieSearch.trim()) this.search();
        else this.loadAll();
      },
      error: (e) => {
        this.loading = false;
        this.error = e?.error?.detail || 'Erreur suppression';
      },
    });
  }

  submit() {
    this.error = '';
    const f = this.form;

    if (this.addingVisit) {
      if (!f.reparation?.trim()) {
        this.error = 'Réparation obligatoire.';
        return;
      }
    } else {
      if (
        !f.numero_serie?.trim() ||
        !f.marque?.trim() ||
        !f.nom_proprietaire?.trim() ||
        !f.telephone?.trim() ||
        !f.reparation?.trim()
      ) {
        this.error = 'Tous les champs sont obligatoires (sauf date).';
        return;
      }
    }

    const payload: EnregistrementCreate = {
      ...f,
      numero_serie: (f.numero_serie || '').trim(),
      marque: (f.marque || '').trim(),
      nom_proprietaire: (f.nom_proprietaire || '').trim(),
      telephone: (f.telephone || '').trim(),
      reparation: (f.reparation || '').trim(),
      date_visite: f.date_visite ? new Date(f.date_visite).toISOString() : null,
    };

    // EDIT
    if (this.editing) {
      if (!this.editingReparationId) {
        this.error = 'Impossible: id réparation manquant';
        return;
      }

      const voiturePayload = {
        marque: payload.marque,
        nom_proprietaire: payload.nom_proprietaire,
        telephone: payload.telephone,
      };

      const repPayload = {
        date_visite: payload.date_visite,
        probleme_signale: payload.reparation,
        reparation_effectuee: payload.reparation,
      };

      this.loading = true;
      this.api.updateVoiture(this.editingNumeroSerie, voiturePayload).subscribe({
        next: () => {
          this.api.updateReparation(this.editingReparationId!, repPayload).subscribe({
            next: () => {
              this.loading = false;
              this.cancelForm();
              this.loadAll();
            },
            error: (e) => {
              this.loading = false;
              this.error = e?.error?.detail || 'Erreur modification réparation';
            },
          });
        },
        error: (e) => {
          this.loading = false;
          this.error = e?.error?.detail || 'Erreur modification voiture';
        },
      });
      return;
    }

    // ADD VISIT
    if (this.addingVisit) {
      this.loading = true;
      this.api.createEnregistrement(payload).subscribe({
        next: () => {
          this.loading = false;
          this.cancelForm();
          this.numeroSerieSearch = payload.numero_serie;
          this.search();
        },
        error: (e) => {
          this.loading = false;
          this.error = e?.error?.detail || 'Erreur ajout réparation';
        },
      });
      return;
    }

    // CREATE
    this.loading = true;
    this.api.createEnregistrement(payload).subscribe({
      next: () => {
        this.loading = false;
        this.cancelForm();
        this.loadAll();
      },
      error: (e) => {
        this.loading = false;
        this.error = e?.error?.detail || 'Erreur création';
      },
    });
  }
}
