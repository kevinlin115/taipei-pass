import { Component, OnInit } from '@angular/core';
import { mergeMap, Observable, of, tap } from 'rxjs';
import { IPageList } from 'src/app/_models/interfaces/page-list.interface';
import { IStore } from 'src/app/_models/interfaces/store.interface';
import { AlertService } from 'src/app/_services/alert.service';
import { TaipeiPassService } from 'src/app/_services/taipei-pass.service';

@Component({
  selector: 'app-fetch-list',
  templateUrl: './fetch-list.component.html',
  styleUrls: ['./fetch-list.component.scss']
})
export class FetchListComponent implements OnInit {

  listInfo: IPageList<any> | null = null;

  fetchedPageCount = 0;
  fetchedStoreCount = 0;
  storeIds = [] as string[];
  stores = [] as IStore[];

  constructor(
    private alertService: AlertService,
    private taipeiPassService: TaipeiPassService,
  ) { }

  ngOnInit(): void {
  }

  start() {
    this.initValue();
    this.getInfo().subscribe()
  }

  private initValue() {
    this.listInfo = null;
    this.fetchedPageCount = 0;
    this.fetchedStoreCount = 0;
    this.storeIds = [];
  }

  private getInfo() {
    return this.taipeiPassService.getListInfo().pipe(
      tap(listInfo => {
        this.listInfo = {
          currentPage: listInfo.currentPage,
          itemsPerPage: listInfo.itemsPerPage,
          list: [],
          totalPages: listInfo.totalPages,
          totals: listInfo.totals,
        }
      }),
      mergeMap(() => {
        if (!this.listInfo) return of(null);
        const pages = Array.from({ length: this.listInfo.totalPages }, (_, i) => i + 1);
        const pageApis = pages.map(page => {
          return this.taipeiPassService.getPageInfo(page).pipe(
            tap((pageInfo) => {
              this.fetchedPageCount++;
              this.storeIds = this.storeIds.concat(
                pageInfo.list.map(storeSimple => storeSimple.id)
              );
            })
          )
        });
        return this.concat(pageApis);
      }),
      mergeMap(() => {
        if (this.storeIds.length === 0) return of(null);
        const storeApis = this.storeIds.slice(0, 500).map((id) => {
          return this.taipeiPassService.getStoreInfo(id).pipe(
            tap(store => {
              this.fetchedStoreCount++;
              this.stores.push(store);
            })
          )
        });
        return this.concat(storeApis);
      }),
      tap(() => {
        this.alertService.success('Success!');
        console.log(`done`)
        console.log(this.stores)
        console.log(JSON.stringify(this.stores))
      })
    );
  }

  test() {
    const storeApis = this.storeIds.map(id => {
      console.log(`id = `, id)
      return this.taipeiPassService.getStoreInfo(id).pipe(
        tap(store => {
          this.fetchedStoreCount++;
          this.stores.push(store);
        })
      )
    });
    this.concat(storeApis).subscribe()
  }

  private concat(list: Observable<any>[]) {

    console.error(`list length = `, list.length)
    if (list.length === 0) return of(null);
    let observable = list[0];
    for (let i = 1; i < list.length; i++) {
      observable = observable.pipe(
        mergeMap(() => {
          return list[i];
        })
      )
    }
    console.error(`obs `, observable)
    return observable;
  }

}
