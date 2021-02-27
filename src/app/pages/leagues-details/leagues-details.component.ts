import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/interfaces/team';
import { TeamsService } from 'src/app/services/teams/teams.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LeaguesService } from 'src/app/services/leagues/leagues.service';
import { League } from 'src/app/interfaces/league';
import { PlayersService } from 'src/app/services/players/players.service';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-leagues-details',
  templateUrl: './leagues-details.component.html',
  styleUrls: ['./leagues-details.component.css']
})
export class LeaguesDetailsComponent implements OnInit {

  public teams: Team[] = [];
  public matrizPlayers: Player[][] = [];
  public league: League = {};
  private deletePlayerSubscription: Subscription = new Subscription();
  private deleteTeamSubscription: Subscription = new Subscription();
  private getPlayerSubscription: Subscription = new Subscription();
  private subscription: Subscription = new Subscription();
  private leagueParam: string = '';

  public fromLeague:boolean = true;

  constructor(private team$: TeamsService, private league$: LeaguesService, private player$: PlayersService, private router: ActivatedRoute ) { }

  ngOnInit(): void {
    this.subscription = this.router.params.subscribe(params => {
      this.leagueParam = params['id'];
      this.showTeams(this.leagueParam);
      this.showLeague(this.leagueParam);
    })
  }


  //Get....
  showLeague(routerParam:string): Subscription {
    return this.league$.getLeagueById(routerParam).subscribe( (res: League) => this.league = res);
  }

  showTeams(routerParam:string): Subscription {
    return this.team$.getTeamsByLeagueHttp(routerParam).subscribe( (res: Team[]) => {
      this.teams = res;
      this.showPlayers(this.teams);
    });
  }

  showPlayers(teams: Team[]): Subscription {
    teams.forEach( (team:Team) => {
      this.getPlayerSubscription = this.player$.getPlayersByLeagueHttp(team.id!).subscribe( (res: Player[]) => {
        this.matrizPlayers.push(res);
      });
    })
    return this.getPlayerSubscription;
  }


  //Delete...
  removePlayer(playerId: string): Subscription {
    this.deletePlayerSubscription = this.player$.deletePlayer(playerId).subscribe( ()=>{
      this.filterMatriz(this.matrizPlayers, playerId);
    });
    return this.deletePlayerSubscription;
  }

  removeTeam(teamId: string): Subscription {
    this.deleteTeamSubscription = this.team$.deleteTeam(teamId).subscribe( ()=>{
      this.filterTeams(this.teams, teamId);
    });
    return this.deleteTeamSubscription;
  }


  //Filters...
  filterMatriz(matriz: Player[][], playerId:string): Player[][] {
    return this.matrizPlayers = matriz.filter(players => players.every(player => player.id !== playerId));
  }

  filterTeams(teams: Team[], teamId:string): Team[] {
    return this.teams = teams.filter(team => team.id !== teamId);
  }


  //Unsubscribes...
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.getPlayerSubscription.unsubscribe();
    this.deletePlayerSubscription.unsubscribe();
  }

}
