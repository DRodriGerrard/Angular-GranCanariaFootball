import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaguesDetailsComponent } from './pages/leagues-details/leagues-details.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'leagues/:id', component: LeaguesDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
