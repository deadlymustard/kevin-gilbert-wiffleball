import { Team } from 'src/app/models/team.model';
import { Injectable, NgZone } from '@angular/core';
import { from, Observable } from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { AngularFirestore, CollectionReference, Query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private firestore: AngularFirestore,
    private zone: NgZone,
  ) { }

  getAllTeams(): Observable<Team[]> {
    return this.firestore.collection<Team>('teams').valueChanges()
  }

  getTeams(year: number): Observable<Team[]> {
    return this.zone.runOutsideAngular(() => {
      return this.firestore.collection<Team>('teams', ref => {
        let query: CollectionReference | Query = ref;
        if (year) {
          query = query.where('year', '==', year)
        }
        return query;
      }).get().pipe(
        map(collection => collection.docs.map((doc: any) => doc.data() as Team))
      );
    })
  }

  getTeam(teamId: string): Observable<Team> {
    return this.zone.runOutsideAngular(() => {
      return this.firestore.doc<Team>(`teams/${teamId}`).valueChanges().pipe(
        first(),
        map(team => team as Team)
      )
    })

  }

  createTeam(team: Team): Observable<String> {
    return from(this.firestore.collection<Team>('teams').add({...team})).pipe(
      map(docRef => docRef.id)
    );
  }

  updateTeam(team: Team): Observable<void> {
    const teamId = team.id;
    delete team.id;
    return from(this.firestore.doc<Team>(`teams/${teamId}`).update({...team}));
  }

  deleteTeam(team: Team) {
    this.firestore.doc(`teams/${team.id}`).delete();
  }
}
