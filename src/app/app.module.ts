import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './pages/main/main.component';
import { MainLeaguesComponent } from './components/main-leagues/main-leagues.component';
import { LeaguesDetailsComponent } from './pages/leagues-details/leagues-details.component';

import { HttpClientModule } from '@angular/common/http';
import { MainTeamsComponent } from './components/main-teams/main-teams.component';
import { MainPlayersComponent } from './components/main-players/main-players.component';
import { TeamsDetailsComponent } from './pages/teams-details/teams-details.component';
import { PlayersDetailsComponent } from './pages/players-details/players-details.component';
import { AddPlayerteamComponent } from './pages/add-playerteam/add-playerteam.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    MainLeaguesComponent,
    LeaguesDetailsComponent,
    MainTeamsComponent,
    MainPlayersComponent,
    TeamsDetailsComponent,
    PlayersDetailsComponent,
    AddPlayerteamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
