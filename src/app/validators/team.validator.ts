import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {QueryDocumentSnapshot, QuerySnapshot} from "@angular/fire/firestore";
import { Team } from '../models/team.model';
import { TeamService } from '../services/team.service';

@Injectable({
  providedIn: 'root'
})
export class TeamValidator {

  constructor(
    private http: HttpClient,
    private teamService: TeamService
  ) {}

  validateTeamName(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.teamService.getTeams().pipe(
        map((teamsReponse: QuerySnapshot<Team>) => {
          const teams: Team[] = teamsReponse.docs.map((teamResponse: QueryDocumentSnapshot<Team>) => teamResponse.data());
          if (teams.some((team: Team) => team.name.toLowerCase() === (control.value as String).toLowerCase())) {
            return {teamExists: `Team '${control.value}' already exists. Please choose a different name.`};
          } else {
            return null;
          }
        })
      )
    };
  }

}