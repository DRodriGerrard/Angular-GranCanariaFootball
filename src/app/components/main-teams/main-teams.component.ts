import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/interfaces/team';

@Component({
  selector: 'app-main-teams',
  templateUrl: './main-teams.component.html',
  styleUrls: ['./main-teams.component.css']
})
export class MainTeamsComponent implements OnInit {

  @Input() team!: Team;
  @Input() fromLeague!: boolean;

  @Output() deleteEmitter: EventEmitter<string> = new EventEmitter<string>();

  private teamLogoImage: string = 'assets/profile/image-logo.png';
  public teamFromLeague: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.fromLeague === true) this.teamFromLeague = true;
    else this.teamFromLeague = false;
  }

  goToTeamDetails() {
    this.router.navigateByUrl('/teams/'+this.team.id);
  }

  updateUrl() {
    this.team.teamLogo = this.teamLogoImage;
  }

  emitDelete() {
    this.deleteEmitter.emit(this.team.id);
  }

  goToEdit() {
    this.router.navigateByUrl('/edit/'+this.team.id+'/team');
  }

}
