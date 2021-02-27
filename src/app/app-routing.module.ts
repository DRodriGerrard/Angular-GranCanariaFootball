import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlayerteamComponent } from './pages/add-playerteam/add-playerteam.component';
import { EditPlayerteamComponent } from './pages/edit-playerteam/edit-playerteam.component';
import { LeaguesDetailsComponent } from './pages/leagues-details/leagues-details.component';
import { MainComponent } from './pages/main/main.component';
import { PlayersDetailsComponent } from './pages/players-details/players-details.component';
import { TeamsDetailsComponent } from './pages/teams-details/teams-details.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'leagues/:id', component: LeaguesDetailsComponent },
  { path: 'teams/:id', component: TeamsDetailsComponent },
  { path: 'players/:id', component: PlayersDetailsComponent },
  { path: 'add', component: AddPlayerteamComponent },
  { path: 'edit/:id', component: EditPlayerteamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
