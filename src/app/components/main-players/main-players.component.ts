import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-main-players',
  templateUrl: './main-players.component.html',
  styleUrls: ['./main-players.component.css']
})
export class MainPlayersComponent implements OnInit {

  @Input() player!: Player;
  @Input() fromLeague!: boolean;

  @Output() deleteEmitter: EventEmitter<string> = new EventEmitter<string>();

  private playerAvatarImage: string = 'assets/profile/image-profile.png';
  public playerFromLeague: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.fromLeague === true) this.playerFromLeague = true;
    else this.playerFromLeague = false;
  }

  goToPlayerDetails() {
    this.router.navigateByUrl('/players/'+this.player.id)
  }

  updateUrl() {
    this.player.avatar = this.playerAvatarImage;
  }

  emitDelete() {
    this.deleteEmitter.emit(this.player.id);
  }

}
