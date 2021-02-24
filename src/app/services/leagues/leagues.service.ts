import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { League } from 'src/app/interfaces/league';

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {

  private dbPath = 'http://localhost:3000/leagues';

  constructor() {}

  getLeagues(): Promise<AxiosResponse<League[]>> {
    return axios.get<League[]>(this.dbPath);
  }
}
