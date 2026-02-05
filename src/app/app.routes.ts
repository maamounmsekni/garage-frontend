import { Routes } from '@angular/router';

import { HistoriquePage } from './features/historique/historique.page';
import { VoituresPage } from './features/voitures/voitures.page';
import { VoitureDetailsPage } from './features/voiture-details/voiture-details.page';

export const routes: Routes = [
  { path: '', redirectTo: 'historique', pathMatch: 'full' },
  { path: 'historique', component: HistoriquePage },
  { path: 'voitures', component: VoituresPage },
  { path: 'voitures/:id', component: VoitureDetailsPage },
  { path: '**', redirectTo: 'historique' }, // This ensures any unknown routes will redirect
];
