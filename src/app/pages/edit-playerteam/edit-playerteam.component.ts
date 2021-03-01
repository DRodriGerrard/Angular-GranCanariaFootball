import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { League } from 'src/app/interfaces/league';
import { Player } from 'src/app/interfaces/player';
import { Team } from 'src/app/interfaces/team';
import { LeaguesService } from 'src/app/services/leagues/leagues.service';
import { PlayersService } from 'src/app/services/players/players.service';
import { TeamsService } from 'src/app/services/teams/teams.service';

@Component({
  selector: 'app-edit-playerteam',
  templateUrl: './edit-playerteam.component.html',
  styleUrls: ['./edit-playerteam.component.css']
})
export class EditPlayerteamComponent implements OnInit {

  public editForm: FormGroup = new FormGroup({});

  private routerParam:string = '';
  private roleParam:string = '';

  public leagues: League[] = [];
  public league: League = {};

  public teams: Team[] = [];
  public team: Team = {};

  public submitted:boolean = false;
  public teamExis: boolean = false;
  public teamSaved: boolean = false;
  public playerSaved: boolean = false;

  public playerIs: boolean = false;
  public teamIs: boolean = false;

  public teamName: string = '';
  public playerName: string = '';
  public leagueName: string = '';
  private leagueId: string = '';

  private subscription = new Subscription();
  private playerSubscription = new Subscription();
  private teamFromPlayerSubscription = new Subscription();
  private leagueFromTeamSubscription = new Subscription();
  private teamsFromLeagueSubscription = new Subscription();
  private playerUpdated = new Subscription();
  private teamUpdated = new Subscription();

  public teamSelected!: string;

  constructor(
    private router: ActivatedRoute,
    private player$: PlayersService,
    private team$: TeamsService,
    private league$: LeaguesService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.subscription = this.router.params.subscribe(params => {
      this.routerParam = params['id'];
      this.roleParam = params['role'];
      if (this.roleParam === 'player') this.isPlayer(this.routerParam);
      else this.isTeam(this.routerParam);
    });

    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      league: [''],
      role: [''],
      team: ['']
    });
  }

  //Submit...
  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    else {
      if (this.playerIs) this.getTeams();
      if (this.teamIs) this.checkTeam();
    }
  }

  //submit player...
  getTeams() {
    this.team$.getTeamsByLeagueHttp(this.leagueId).subscribe( (teams:Team[]) => {
      const teamFilter = teams.filter(team => team.teamName === this.editForm['controls'].team.value);
      this.updatePlayer(teamFilter[0].id!);
    });
  }

  updatePlayer(dataId: string): Subscription {

    let playerToUpdate: Player = {
      id: this.routerParam,
      playerName: this.editForm['controls'].name.value,
      teamId: dataId
    }
    this.playerSaved = true;
    return this.playerUpdated = this.player$.patchPlayer(playerToUpdate).subscribe();
  }

  //submit team...
  updateTeam(dataId:string) {
    let teamToUpdate: Team = {
      id: this.routerParam,
      teamName: this.editForm['controls'].name.value,
      league: dataId
    }
    this.teamSaved = true;
    return this.teamUpdated = this.team$.patchTeam(teamToUpdate).subscribe();
  }

  checkTeam() {
    const exist = this.teamExist();
    if (exist) this.teamExis = true;
    else {
      const league = this.leagues.filter(league => league.leagueName === this.editForm['controls'].league.value);
      this.updateTeam(league[0].id!);
    }
  }

  teamExist(): boolean {
    let response;
    if (this.teams.find(team => team.teamName === this.editForm['controls'].name.value)) response = true;
    else response = false;
    return response;
  }


  //Get...
  get form() {
    return this.editForm.controls;
  }

  isPlayer(param: string) {
    this.player$.getPlayerById(param)
    .subscribe(
      (res:Player) => {
        this.playerIs = true;
        this.playerName = res.playerName!;
        this.editForm['controls'].name.setValue(res.playerName);
        this.getTeamFromPlayer(res.teamId!);
      },
      (err) => console.log(err)
    );
  }

  isTeam(param:string) {
    this.team$.getTeamById(param)
    .subscribe(
      (res:Team) => {
        this.teamIs = true;
        this.team = res;
        this.teamName = res.teamName!;
        this.editForm['controls'].name.setValue(res.teamName);
        this.showLeagues();
      },
      (err) => this.isTeam(param)
    );
  }


  //Is a Player...
  getTeamFromPlayer(data:string): Subscription {
    return this.teamFromPlayerSubscription =  this.team$.getTeamById(data).subscribe( (res:Team) => {
      this.teamName = res.teamName!;
      this.getLeagueFromTeam(res.league!);
    });
  }

  getLeagueFromTeam(data:string): Subscription {
    return this.leagueFromTeamSubscription = this.league$.getLeagueById(data).subscribe( (res:League) => {
      this.leagueId = res.id!;
      this.showTeamsByLeague(res.id!);
    })
  }

  showTeamsByLeague(data:string): Subscription {
    this.teamsFromLeagueSubscription =  this.team$.getTeamsByLeagueHttp(data).subscribe((res:Team[]) => {
      this.teams = res;
      if (this.playerIs) this.defaultTeamSelected();
    })
    return this.teamsFromLeagueSubscription;
  }


  //Is a Team...
  showLeagues() {
    this.league$.getLeaguesHttp().subscribe((leagues:League[]) => {
      this.leagues = leagues;
      const league = leagues.filter(league => league.id === this.team.league);
      this.leagueName = league[0].leagueName!;

      this.defaultLeagueSelected();
      this.showTeamsByLeague(league[0].id!);
    })
  }


  //Default values...
  defaultTeamSelected() {
    this.editForm.controls['team'].setValue(this.teamName);
  }

  defaultLeagueSelected() {
    this.editForm.controls['league'].setValue(this.leagueName);
  }


  //Changes...
  onChangeLeague(data: string) {
    const league = this.leagues.filter(league => league.leagueName === data);
    this.league = league[0]!;

    this.showTeamsByLeague(this.league.id!);
  }

  onChangeTeam(data: string) {
    this.editForm['controls'].team.setValue(data);
    this.teamSelected = this.editForm['controls'].team.value;
  }


  //Reset y Unsubscribe..
  onReset() {
    this.submitted = false;
    this.teamExis = false;
    this.playerSaved = false;
    this.teamSaved = false;

    this.editForm['controls'].team.setValue(this.teamName);
    this.editForm['controls'].name.setValue(this.playerName);
  }

  ngOnDestroy() {
    this.playerSubscription.unsubscribe();
    this.teamFromPlayerSubscription.unsubscribe();
    this.leagueFromTeamSubscription.unsubscribe();
    this.teamsFromLeagueSubscription.unsubscribe();
    this.subscription.unsubscribe();
    this.playerUpdated.unsubscribe();
    this.teamUpdated.unsubscribe();
  }
}
