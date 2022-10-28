import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { IStore } from 'src/app/_models/interfaces/store.interface';
import * as Stores from 'src/assets/Stores.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  displayStores = new FormControl(true);
  boundChanged$ = new Subject();
  boundSub: Subscription;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  @ViewChildren(MapMarker) markers: QueryList<MapMarker>;

  readonly center: google.maps.LatLngLiteral = {
    lat: 25.04776880156601,
    lng: 121.51708433228653
  };
  readonly options: google.maps.MapOptions = {
    disableDefaultUI: true,
  }
  readonly zoom = 17;
  stores = [] as IStore[];
  filteredStores = [] as IStore[];

  infoWindowValues = {
    name: '',
    address: ''
  };

  constructor() {
    this.boundSub = this.boundChanged$.pipe(
      debounceTime(300)
    ).subscribe(() => this.refreshStores());
  }

  ngOnInit(): void {
    this.initData();
  }

  ngAfterViewInit(): void {
    this.refreshStores();
  }

  ngOnDestroy(): void {
    this.boundSub.unsubscribe();
  }

  private initData() {
    this.stores = Object.values(Stores) as any;
  }

  onBoundsChange() {
    this.refreshStores();
  }

  private refreshStores() {
    this.filteredStores = [];
    const bounds = this.map.getBounds();
    if (!bounds) return;
    this.filteredStores = this.stores.filter((store) => {
      const latLng = new google.maps.LatLng(store.lat, store.lng);
      return bounds.contains(latLng);
    });
  }

  openInfo(index: number) {
    const store = this.filteredStores[index];
    this.infoWindowValues = {
      name: store.name,
      address: store.address
    };
    this.infoWindow.open(this.markers.get(index));
  }

}
