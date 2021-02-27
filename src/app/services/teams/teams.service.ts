import { Injectable } from '@angular/core';
import { Team } from 'src/app/interfaces/team';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { League } from 'src/app/interfaces/league';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private dbPath = 'http://localhost:3000/teams';

  constructor(private http$: HttpClient) { }

  getTeamsByLeagueHttp(leagueId:string): Observable<Team[]> {
    return this.http$.get<League[]>(this.dbPath, {
      params: {
        league: leagueId
      }
    });
  }

  getTeamById(id:string): Observable<Team> {
    return this.http$.get<Team>(this.dbPath+'/'+id);
  }

  postTeam(team:Team): Observable<Team> {
    return this.http$.post<Team>(this.dbPath, team).pipe(first());
  }

  deleteTeam(teamId:string): Observable<string> {
    return this.http$.delete<string>(this.dbPath+'/'+teamId);
  }
}
