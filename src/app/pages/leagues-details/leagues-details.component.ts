import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/services/teams/teams.service';

@Component({
  selector: 'app-leagues-details',
  templateUrl: './leagues-details.component.html',
  styleUrls: ['./leagues-details.component.css']
})
export class LeaguesDetailsComponent implements OnInit {

  constructor(private team$: TeamsService) { }

  ngOnInit(): void {

  }

  showTeams() {

  }

}
