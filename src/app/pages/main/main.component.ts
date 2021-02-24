import { Component, OnInit } from '@angular/core';
import { League } from 'src/app/interfaces/league';
import { LeaguesService } from 'src/app/services/leagues/leagues.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  leagues: League[] = [];

  constructor(private league$: LeaguesService) {}

  ngOnInit(): void {
    this.showLeagues();
  }

  showLeagues() {
    this.league$.getLeagues()
    .then(res => this.leagues = res.data)
    .catch(err => err)
  }

}
