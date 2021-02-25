import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { League } from 'src/app/interfaces/league';

@Component({
  selector: 'app-main-leagues',
  templateUrl: './main-leagues.component.html',
  styleUrls: ['./main-leagues.component.css']
})
export class MainLeaguesComponent implements OnInit {

  @Input()
  league!: League;

  constructor(private router:Router) { }

  ngOnInit(): void {}

  goToLeagueDetails() {
    this.router.navigateByUrl('/leagues/'+this.league.id)
  }

}
