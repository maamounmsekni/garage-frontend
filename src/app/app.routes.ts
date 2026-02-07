import { Routes } from '@angular/router';

import { HistoriquePage } from './features/historique/historique.page';
import { VoituresComponent } from './features/voitures/voitures.component';
import { VoitureDetailsComponent } from './features/voiture-details/voiture-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'historique', pathMatch: 'full' },
  { path: 'historique', component: HistoriquePage },
  { path: 'voitures', component: VoituresComponent },
  { path: 'voitures/:id', component: VoitureDetailsComponent },
  { path: '**', redirectTo: 'historique' }, // This ensures any unknown routes will redirect
];
