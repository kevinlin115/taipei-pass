import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { IStore } from 'src/app/_models/interfaces/store.interface';
import * as Stores from 'src/assets/Stores.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayStores = new FormControl(false);

  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  @ViewChildren(MapMarker) markers: QueryList<MapMarker>;

  readonly center: google.maps.LatLngLiteral = {
    lat: 25.04776880156601,
    lng: 121.51708433228653
  };
  readonly options: google.maps.MapOptions = {
    disableDefaultUI: true,
  }
  readonly zoom = 15;
  stores = [] as IStore[];

  infoWindowValues = {
    name: '',
    address: ''
  };

  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  private initData() {
    this.stores = Object.values(Stores) as any;
  }

  openInfo(index: number) {
    const store = this.stores[index];
    this.infoWindowValues = {
      name: store.name,
      address: store.address
    };
    this.infoWindow.open(this.markers.get(index));
  }

}
