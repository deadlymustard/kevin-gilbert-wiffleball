import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SinglePageService {

  constructor(private http: HttpClient) { }

  /* Fetch a Single Type Object from Strapi by ID */
  fetch(id: string): Observable<any> {
    return this.http.get<any>(`${environment.strapiApiUrl}/${id}`);
  }
}
