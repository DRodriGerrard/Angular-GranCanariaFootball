import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-main-players',
  templateUrl: './main-players.component.html',
  styleUrls: ['./main-players.component.css']
})
export class MainPlayersComponent implements OnInit {

  @Input()
  player!: Player;

  playerAvatarImage: string = 'assets/profile/image-profile.png';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPlayerDetails() {
    this.router.navigateByUrl('/players/'+this.player.id)
  }

  updateUrl() {
    this.player.avatar = this.playerAvatarImage;
  }

}
