import { FetchListComponent } from './components/fetch-list/fetch-list.component';
import { ConfigComponent } from './components/config/config.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: ConfigComponent,
    path: 'config',
  },
  {
    component: FetchListComponent,
    path: 'fetch-list',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
