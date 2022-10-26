import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import * as _ from 'lodash';
import { concat, mergeMap, of, tap } from 'rxjs';
import { IPageList } from 'src/app/_models/interfaces/page-list.interface';
import { IStore } from 'src/app/_models/interfaces/store.interface';
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
  stores = {} as { [id: string]: Partial<IStore> };

  constructor(
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
            tap(() => {
              this.fetchedPageCount++;
            }),
            mergeMap((pageInfo) => {
              const storeApis = pageInfo.list.map(storeSimple => {
                const id = storeSimple.id;
                return this.taipeiPassService.getStoreInfo(id).pipe(
                  tap(store => {
                    this.fetchedStoreCount++;
                    this.stores[store.id] = _.pick(store, ['name', 'district', 'address', 'earlyBird']);
                  })
                );
              });
              return concat(...storeApis);
            })
          )
        });
        return concat(...pageApis);
      }),
    );
  }

  download() {
    saveAs(new Blob([JSON.stringify(this.stores)]), 'Stores.json')
  }

}
