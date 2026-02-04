import { Routes } from '@angular/router';

import { HistoriquePage } from './features/historique/historique.page';
import { ProprietairesPage } from './features/proprietaires/proprietaires.page';
import { TypesVoiturePage } from './features/types-voiture/types-voiture.page';
import { VoituresPage } from './features/voitures/voitures.page';
import { VoitureDetailsPage } from './features/voiture-details/voiture-details.page';

export const routes: Routes = [
  { path: '', redirectTo: 'historique', pathMatch: 'full' },

  { path: 'historique', component: HistoriquePage },
  { path: 'voitures', component: VoituresPage },
  { path: 'voitures/:id', component: VoitureDetailsPage },
  { path: 'proprietaires', component: ProprietairesPage },
  { path: 'types-voiture', component: TypesVoiturePage },

  { path: '**', redirectTo: 'historique' },
];
