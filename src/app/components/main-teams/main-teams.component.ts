import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/interfaces/team';

@Component({
  selector: 'app-main-teams',
  templateUrl: './main-teams.component.html',
  styleUrls: ['./main-teams.component.css']
})
export class MainTeamsComponent implements OnInit {

  @Input()
  team!: Team;

  teamLogoImage: string = 'assets/profile/image-profile.png';

  constructor(private router: Router) { }

  ngOnInit(): void {}

  goToTeamDetails() {
    this.router.navigateByUrl('/teams/'+this.team.id);
  }

}
