import { Routes } from '@angular/router';

import { HistoriquePage } from './features/historique/historique.page';

export const routes: Routes = [
  { path: '', redirectTo: 'historique', pathMatch: 'full' },
  { path: 'historique', component: HistoriquePage },
  { path: '**', redirectTo: 'historique' }, // This ensures any unknown routes will redirect
];
