import { Observable } from 'rxjs/internal/Observable';
import { SinglePageService } from './single-page.service';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ConfigurationData } from '../interfaces/wiffle-ball-register-page';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private _configurationData!: ConfigurationData;

  constructor(private singlePageService: SinglePageService) {}

  // This should really be an APP_INITIALZIER type function - but does not seem to be working at the moment.
  // https://github.com/angular/universal/issues/1623
  loadConfigurationData(): Observable<ConfigurationData> {
    return this.singlePageService.fetch("site-configuration").pipe(
      tap((config: ConfigurationData) => this._configurationData = config),
      map(() => this._configurationData)
    );
  }

  // Saves us from calling config every single time.
  get configurationData(): Observable<ConfigurationData> {
    if (!this._configurationData) {
      return this.loadConfigurationData();
    } else {
      return of(this._configurationData);
    }

  }
}
