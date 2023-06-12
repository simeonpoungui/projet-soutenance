import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnseignantListe } from '../models/enseignant.model';
import { Enseignant } from '../models/enseignant.model';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8000/recuperation/enseignant';
  private apiUrladd = 'http://localhost:8000/add/enseignant';
  private apiUrldelete = 'http://localhost:8000/delete/enseignant';
  private apiUrlupdate = 'http://localhost:8000/update/enseignant';


  getEtudiantss(): Observable<EnseignantListe> {
    return this.http.post<EnseignantListe>(this.apiUrl, {
      method: 'POST'
    });
  }

  geById(enseignantID: string): Observable<Enseignant[]> {
    const body = { method: 'POST', id: enseignantID };
    return this.http.post<Enseignant[]>(this.apiUrl, JSON.stringify(body));
  }

  add(Enseignant: Enseignant): Observable<Enseignant> {
    return this.http.post<Enseignant>(this.apiUrladd, Enseignant);
  }

  update(Enseignant: Enseignant): Observable<Enseignant> {
    const url = `${this.apiUrlupdate}`;
    return this.http.post<Enseignant>(url, Enseignant);
  }

  delete(id: string): Observable<Enseignant> {
    return this.http.post<Enseignant>(this.apiUrldelete, {
      method: 'DELETE',
      id: id
    });
  }
}