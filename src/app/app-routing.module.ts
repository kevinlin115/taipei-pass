import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from './../environments/environment';
import { ConfigComponent } from './components/config/config.component';
import { FetchListComponent } from './components/fetch-list/fetch-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  ...(environment.production ? [] : [
    {
      component: ConfigComponent,
      path: 'config',
    },
    {
      component: FetchListComponent,
      path: 'fetch-list',
    }
  ]),
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
