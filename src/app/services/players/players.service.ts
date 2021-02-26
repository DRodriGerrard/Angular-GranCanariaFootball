import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Player } from 'src/app/interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private dbPath = 'http://localhost:3000/players';

  constructor(private http$: HttpClient) { }

  getPlayersByLeagueHttp(teamId:string): Observable<Player[]> {
    return this.http$.get<Player[]>(this.dbPath, {
      params: {
        teamId: teamId
      }
    });
  }

  getPlayerById(id:string): Observable<Player> {
    return this.http$.get<Player>(this.dbPath+'/'+id);
  }

  postPlayer(player:Player): Observable<Player> {
    return this.http$.post<Player>(this.dbPath, player);
  }
}
