import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/interfaces/player';
import { PlayersService } from 'src/app/services/players/players.service';

@Component({
  selector: 'app-players-details',
  templateUrl: './players-details.component.html',
  styleUrls: ['./players-details.component.css']
})
export class PlayersDetailsComponent implements OnInit {

  public player: Player = {};
  private subscription: Subscription = new Subscription();
  private playerParam: string = '';

  constructor(private player$: PlayersService,private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.router.params.subscribe(params => {
      this.playerParam = params['id'];
      this.showPlayer(this.playerParam);
    })
  }

  showPlayer(routerParam:string): Subscription {
    return this.player$.getPlayerById(routerParam).subscribe( (res: Player) => this.player = res);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
