import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  token$ = new BehaviorSubject<string>(environment.token);

  constructor() {
    this.getToken();
  }

  saveToken(token: string) {
    this.token$.next(token);
    localStorage.setItem(KEY_TOKEN, token);
  }

  getToken() {
    const token = localStorage.getItem(KEY_TOKEN);
    if (!token) return;
    this.token$.next(token);
  }
}

const KEY_TOKEN = 'TOKEN';
