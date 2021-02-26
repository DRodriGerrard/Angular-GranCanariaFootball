import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { League } from 'src/app/interfaces/league';
import { Player } from 'src/app/interfaces/player';
import { Team } from 'src/app/interfaces/team';
import { LeaguesService } from 'src/app/services/leagues/leagues.service';
import { PlayersService } from 'src/app/services/players/players.service';
import { TeamsService } from 'src/app/services/teams/teams.service';

@Component({
  selector: 'app-add-playerteam',
  templateUrl: './add-playerteam.component.html',
  styleUrls: ['./add-playerteam.component.css']
})
export class AddPlayerteamComponent implements OnInit {

  private getLeaguesSubscription: Subscription = new Subscription();
  private getTeamsSubscription: Subscription = new Subscription();

  private postPlayerSubscription: Subscription = new Subscription();
  private postTeamSubscription: Subscription = new Subscription();

  public leagues: League[] = [];
  public teams: Team[] = [];
  public roles:any = ['jugador', 'equipo'];
  public addForm: FormGroup = new FormGroup({});

  public leagueSelected!: string;
  public roleSelected!: string;
  public teamSelected!: string;
  public playerRoleSelected: boolean = true;

  public teamLogoImage: string = 'assets/profile/image-logo.png';
  public playerAvatarImage: string = 'assets/profile/image-profile.png';

  public submitted: boolean = false;
  public teamExis: boolean = false;

  public teamSaved:boolean = false;
  public playerSaved: boolean = false;

  constructor(
    private player$: PlayersService,
    private team$: TeamsService,
    private league$: LeaguesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

    this.showLeagues();

    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      league: [''],
      role: [''],
      team: ['']
    });

    this.defaultRoleSelected();
  }

  get form() {
    return this.addForm.controls;
  }

  //Submit...
  teamExist(): boolean {
    let response;
    if (this.teams.find(team => team.teamName === this.addForm['controls'].name.value)) response = true;
    else response = false;
    return response;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    else {
      if (this.addForm['controls'].role.value === 'jugador') {
        this.saveNewPlayer();
      }
      else {
        this.teamExis = this.teamExist();
        if (!this.teamExis) this.saveNewTeam();
      }
    }
  }

  saveNewPlayer(): Subscription {
    let formValues = {...this.addForm.value};
    let playerTeam = this.teams.find(team => team.teamName === this.teamSelected);

    let newPlayer: Player = {
      playerName: formValues.name,
      avatar: this.playerAvatarImage,
      teamId: playerTeam?.id
    };

    console.log(playerTeam);
    console.log(newPlayer)

    return this.postPlayerSubscription = this.player$.postPlayer(newPlayer).subscribe(()=>{
      this.playerSaved = true;
      setTimeout(() =>{
        return this.onReset();
      },3000);
    })
  }

  saveNewTeam(): Subscription {
    let formValues = {...this.addForm.value};
    let teamLeague = this.leagues.find(league => league.leagueName === this.leagueSelected);

    let newTeam: Team = {
      teamName: formValues.name,
      teamLogo: this.teamLogoImage,
      league: teamLeague?.id
    };
    return this.postTeamSubscription = this.team$.postTeam(newTeam).subscribe(()=>{
      this.teamSaved = true;
      setTimeout(() =>{
        return this.onReset();
      },2000);
    });
  }


  //show functions...
  showLeagues(): Subscription {
    return this.getLeaguesSubscription = this.league$.getLeaguesHttp().subscribe( (res:League[]) => {
      this.leagues = res;
      this.defaultLeagueSelected(this.leagues);
    });
  }

  showTeams(league:League): Subscription {
    return this.getTeamsSubscription = this.team$.getTeamsByLeagueHttp(league.id!).subscribe( (res: Team[]) => {
      this.teams = res;
      this.defaulTeamSelected(this.teams);
    });
  }



  //Default values selected
  defaultLeagueSelected(leagues: League[]) {
    console.log(this.addForm['controls'].league.value)
    if (this.addForm['controls'].league.value === '') {

      this.addForm['controls'].league.setValue(leagues[0].leagueName);
      this.leagueSelected = this.addForm['controls'].league.value;

      this.leagues.forEach(league => {
        if (league.leagueName === this.leagueSelected) this.showTeams(league);
      });
    }
  }

  defaulTeamSelected(teams:Team[]) {
    this.addForm['controls'].team.setValue('');
    if (this.addForm['controls'].team.value === '') {
      this.addForm['controls'].team.setValue(teams[0].teamName);
      this.teamSelected = this.addForm['controls'].team.value;
    }
  }

  defaultRoleSelected() {
    if (this.addForm['controls'].role.value === '') this.addForm['controls'].role.setValue(this.roles[0]);
    this.roleSelected = this.addForm['controls'].role.value;
  }


  //onChange functions...
  onChangeLeague(data: string) {
    this.addForm['controls'].league.setValue(data);
    this.leagueSelected = this.addForm['controls'].league.value;

    let leagueByName = this.leagues.find(league => league.leagueName === this.leagueSelected);
    if (leagueByName !== undefined) {
      //console.log(leagueByName)
      this.showTeams(leagueByName)
    };
  }

  onChangeRole(data: string) {
    this.addForm['controls'].role.setValue(data);
    this.roleSelected = this.addForm['controls'].role.value;
  }

  onChangeTeam(data: string) {
    this.addForm['controls'].team.setValue(data);
    this.teamSelected = this.addForm['controls'].team.value;
  }


  onReset() {
    this.submitted = false;
    this.teamExis = false;
    this.playerSaved = false;
    this.teamSaved = false;

    this.addForm['controls'].league.setValue('');
    this.addForm['controls'].role.setValue(this.roles[0]);
    this.addForm['controls'].name.setValue('');
    //console.log(this.leagues)
    this.defaultLeagueSelected(this.leagues);
  }

  ngOnDestroy():void {
    this.getLeaguesSubscription.unsubscribe();
    this.getTeamsSubscription.unsubscribe();
    this.postTeamSubscription.unsubscribe();
    this.postPlayerSubscription.unsubscribe();
  }

}
