import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/../environments/environment.prod';
import { IPageList } from 'src/app/_models/interfaces/page-list.interface';
import { IStoreSimple } from 'src/app/_models/interfaces/store-simple.interface';
import { IStore } from 'src/app/_models/interfaces/store.interface';
import { ConfigService } from 'src/app/_services/config.service';

@Injectable({
  providedIn: 'root'
})
export class TaipeiPassService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getListInfo() {
    return this.http.get<IPageList<any>>(this.getPageUrl(1), {
      headers: {
        authorization: this.configService.token$.value
      }
    });
  }

  getPageInfo(page: number) {
    return this.http.get<IPageList<IStoreSimple>>(this.getPageUrl(page), {
      headers: {
        authorization: this.configService.token$.value
      }
    });
  }

  getStoreInfo(id: string) {
    return this.http.get<IStore>(this.getStoreUrl(id), {
      headers: {
        authorization: this.configService.token$.value
      }
    });
  }

  private getPageUrl(page: number) {
    return `${environment.API_URL}search?` +
      `Lng=25.0336434&Lat=121.5003626&CouponTypes=63&Page=${page}&PerPageLimt=120`;
  }

  private getStoreUrl(id: string) {
    return `${environment.API_URL}${id}`;
  }
}
