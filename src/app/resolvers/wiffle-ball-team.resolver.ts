import { Team } from './../models/team.model';
import { TeamService } from './../services/team.service';
import { Injectable, NgZone } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WiffleBallTeamResolver implements Resolve<Team | undefined> {

  constructor(
    private teamService: TeamService,
    private zone: NgZone,
    private router: Router
  ) {}

  // Disable Due To Angular <> Firestore Bug
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Team | undefined> {
    const id = route.paramMap.get('id');
    if(!id) {
      this.router.navigate(['/not-found']);
      return of();
    } else {
      return this.teamService.getTeam(id);
    }
  }
}
