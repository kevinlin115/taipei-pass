import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ConfigComponent } from './components/config/config.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FetchListComponent } from './components/fetch-list/fetch-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfigComponent,
    FetchListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
