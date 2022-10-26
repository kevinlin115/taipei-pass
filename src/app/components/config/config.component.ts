import { AlertService } from './../../_services/alert.service';
import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfigService } from 'src/app/_services/config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  token = new FormControl(this.configService.token$.value);

  constructor(
    private configService: ConfigService,
    public alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  save() {
    const value = this.token.value;
    if (!value) return;
    this.configService.saveToken(value);
    this.alertService.success('Saved');
  }

}
