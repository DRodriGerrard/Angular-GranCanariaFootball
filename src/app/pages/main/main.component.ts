import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { League } from 'src/app/interfaces/league';
import { LeaguesService } from 'src/app/services/leagues/leagues.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public leagues: League[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private league$: LeaguesService) {}

  ngOnInit(): void {
    this.showLeagues();
  }

  showLeagues(): Subscription {
    return this.subscription = this.league$.getLeaguesHttp().subscribe( (res:League[]) => this.leagues = res);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
