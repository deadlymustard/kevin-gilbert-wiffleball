import { ConfigurationService } from './../services/configuration.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import {QueryDocumentSnapshot, QuerySnapshot} from "@angular/fire/firestore";
import { Team } from '../models/team.model';
import { TeamService } from '../services/team.service';

@Injectable({
  providedIn: 'root'
})
export class TeamValidator {

  constructor(
    private configurationService: ConfigurationService,
    private teamService: TeamService
  ) {}

  validateTeamName(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.configurationService.configurationData.pipe(
        mergeMap((configurationData) => {
          return this.teamService.getTeams(configurationData.registrationYear).pipe(
            map((teams: Team[]) => {
              if (teams.some((team: Team) => team.name.toLowerCase() === (control.value as String).toLowerCase())) {
                return {teamExists: `Team '${control.value}' already exists. Please choose a different name.`};
              } else {
                return null;
              }
            })
          )
        })
      )
    };
  }
}
