import { IMapInfo } from 'src/app/_models/interfaces/map-info.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {

  constructor(
    private http: HttpClient
  ) { }

  geocode(address: string) {
    return this.http.get<IMapInfo>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}` +
      `&key=AIzaSyC79HcLuISd-5t7miNwKvn7d2nZFa4732U`);
  }
}
