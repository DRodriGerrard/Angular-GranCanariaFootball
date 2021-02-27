import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/interfaces/player';
import { Team } from 'src/app/interfaces/team';
import { PlayersService } from 'src/app/services/players/players.service';
import { TeamsService } from 'src/app/services/teams/teams.service';

@Component({
  selector: 'app-players-details',
  templateUrl: './players-details.component.html',
  styleUrls: ['./players-details.component.css']
})
export class PlayersDetailsComponent implements OnInit {

  public player: Player = {};
  public team: Team = {};
  private subscription: Subscription = new Subscription();
  private playerParam: string = '';

  constructor(
    private player$: PlayersService,
    private team$: TeamsService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.router.params.subscribe(params => {
      this.playerParam = params['id'];
      this.showPlayer(this.playerParam);
    })
  }

  showPlayer(routerParam:string): Subscription {
    return this.player$.getPlayerById(routerParam).subscribe( (res: Player) => {
      this.player = res
      this.showTeam(this.player.teamId!);
    });
  }

  showTeam(teamId:string) {
    return this.team$.getTeamById(teamId).subscribe( (res:Team) => this.team = res);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
