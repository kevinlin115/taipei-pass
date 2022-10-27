import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { AlertService } from './_services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  get environment() { return environment; }

  constructor(
    public alertService: AlertService
  ) { }

}
