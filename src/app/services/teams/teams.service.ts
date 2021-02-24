import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Team } from 'src/app/interfaces/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private dbPath = 'http://localhost:3000/teams';

  constructor() { }

  getTeamsByLeagues(leagueId:string): Promise<AxiosResponse<Team[]>> {
    return axios.get<Team[]>(this.dbPath, {
      params: {
        id: leagueId
      }
    });
  }
}
