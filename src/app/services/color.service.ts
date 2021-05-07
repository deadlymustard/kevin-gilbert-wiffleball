import { HttpClient } from '@angular/common/http';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { QuerySnapshot } from '@angular/fire/firestore';
import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(
    private zone: NgZone,
    private firestore: AngularFirestore
  ) { }

  getColors() {
    return this.zone.runOutsideAngular(() => {
      return this.firestore.collection<any>('data').doc<any>('static').get().pipe(
        map((res: any) => res.data().colors)
      );
    });
  }
}
