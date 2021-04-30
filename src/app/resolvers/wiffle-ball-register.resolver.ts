import { ConfigurationData } from './../interfaces/wiffle-ball-register-page';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './../services/configuration.service';
import { ColorService } from './../services/color.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TeamService } from '../services/team.service';
import { map, mergeMap } from 'rxjs/operators';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class WiffleBallRegisterResolver implements Resolve<String[]> {
  constructor(
    private httpClient: HttpClient,
    private teamService: TeamService,
    private colorService: ColorService,
    private configurationService: ConfigurationService
  ) { }

  // Disabled Due To Angular <> Firestore Bug
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<String[]> | Promise<String[]> | String[] {
    return this.configurationService.configurationData.pipe(
      mergeMap((configurationData: ConfigurationData) => {
        return this.colorService.getColors().pipe(
          mergeMap((colors: String[]) => {
            return this.teamService.getTeams(configurationData.registrationYear).pipe(
              map((teams: Team[]) => {
                const remainingColors: String[] = colors.filter((color: String) => {
                  return !teams.some((team: Team) => team.color === color)
                });
                return remainingColors;
              })
            )
          })
        );
      })
    )
  }
}
