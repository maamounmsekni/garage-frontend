import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  // <-- Import RouterModule
import { AppComponent } from './app.component';
import { HistoriquePage } from './features/historique/historique.page';
import { routes } from './app.routes';  // <-- Import routes from app.routes.ts

@NgModule({
  declarations: [
    AppComponent,
    HistoriquePage,  // <-- Declare HistoriqueComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),  // <-- Configure the RouterModule with routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
