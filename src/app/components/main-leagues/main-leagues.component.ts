import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-leagues',
  templateUrl: './main-leagues.component.html',
  styleUrls: ['./main-leagues.component.css']
})
export class MainLeaguesComponent implements OnInit {

  @Input() league: any;

  constructor() { }

  ngOnInit(): void {}

}
