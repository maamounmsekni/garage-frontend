// src/app/app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },

  // ✅ dynamic -> do NOT prerender
  { path: 'voitures/:id', renderMode: RenderMode.Server }, // or RenderMode.Client

  { path: '**', renderMode: RenderMode.Server },
];
