import { Team } from 'src/app/models/team.model';
import { Injectable } from '@angular/core';
import {AngularFirestore, CollectionReference, DocumentReference, DocumentSnapshot, Query, QuerySnapshot} from "@angular/fire/firestore";
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private firestore: AngularFirestore) { }

  getAllTeams(): Observable<Team[]> {
    return this.firestore.collection<Team>('teams').get().pipe(
      map(collection => collection.docs.map(doc => doc.data()))
    );
  }

  getTeams(year: number): Observable<Team[]> {
    return this.firestore.collection<Team>('teams', ref => {
      let query: CollectionReference | Query = ref;
      if (year) {
        query = query.where('year', '==', year)
      }
      return query;
    }).get().pipe(
      map(collection => collection.docs.map(doc => doc.data()))
    );
  }

  getTeam(teamId: string): Observable<Team> {
    console.log(teamId);
    return this.firestore.doc<Team>(`teams/${teamId}`).get().pipe(
      map(doc => doc.data() as Team)
    );
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
