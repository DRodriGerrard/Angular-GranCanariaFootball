import { Injectable } from '@angular/core';
import { League } from 'src/app/interfaces/league';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {

  private dbPath = 'http://localhost:3000/leagues';

  constructor(private http$: HttpClient) {}

  getLeaguesHttp(): Observable<League[]> {
    return this.http$.get<League[]>(this.dbPath);
  }

  getLeagueById(id:string): Observable<League> {
    return this.http$.get<League>(this.dbPath+'/'+id);
  }
}
