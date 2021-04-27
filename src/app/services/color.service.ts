import { DocumentSnapshot } from '@angular/fire/firestore';
import { QuerySnapshot } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private firestore: AngularFirestore) { }

  getColors() {
    return this.firestore.collection<any>('data').doc<any>('static').get().pipe(
      map((res: any) => res.data().colors)
    );
  }
}
