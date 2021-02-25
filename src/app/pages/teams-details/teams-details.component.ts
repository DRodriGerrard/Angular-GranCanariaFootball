import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/interfaces/player';
import { Team } from 'src/app/interfaces/team';
import { PlayersService } from 'src/app/services/players/players.service';
import { TeamsService } from 'src/app/services/teams/teams.service';

@Component({
  selector: 'app-teams-details',
  templateUrl: './teams-details.component.html',
  styleUrls: ['./teams-details.component.css']
})
export class TeamsDetailsComponent implements OnInit {

  public team: Team = {};
  public players: Player[] = [];
  private subscription: Subscription = new Subscription();
  private teamParam: string = '';

  constructor(private team$: TeamsService, private player$: PlayersService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.router.params.subscribe(params => {
      this.teamParam = params['id'];
      this.showTeam(this.teamParam);
      this.showPlayers(this.teamParam);
    })
  }

  showTeam(routerParam:string): Subscription {
    return this.team$.getTeamById(routerParam).subscribe( (res: Team) => this.team = res);
  }

  showPlayers(routerParam:string): Subscription {
    return this.player$.getPlayersByLeagueHttp(routerParam).subscribe( (res: Team[]) => {
      this.players = res;
      console.log(this.players)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
