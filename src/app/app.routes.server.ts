import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'historique', renderMode: RenderMode.Server },
  { path: 'voitures/:id', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server },  // Catch all route, ensuring SSR for all paths
];
