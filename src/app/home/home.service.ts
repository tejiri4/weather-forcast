import { Injectable } from '@angular/core';
import { Feature } from './home';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  url = 'https://api.weather.gov/gridpoints';
  constructor() {}

  async getForcast(loc: string): Promise<Feature> {
    const data = await fetch(`${this.url}/${loc}/31,80/forecast`);
    return (await data.json()) ?? [];
  }
}
