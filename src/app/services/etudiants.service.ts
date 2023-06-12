import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiants } from '../models/etudiants.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantssService {

  constructor(private http : HttpClient) { }

  private apiUrl = 'http://localhost:8000/recuperation/etudiants';


  getEtudiantss(): Observable<Etudiants[]> {
    return this.http.post<Etudiants[]>(this.apiUrl, {
      method: 'POST'
    });
  }

  getEtudiantById(id: string): Observable<Etudiants[]> {
    const body = { method: 'POST', id: id };
    return this.http.post<Etudiants[]>(this.apiUrl, JSON.stringify(body));
  }

  addEtudiants(Etudiants: Etudiants): Observable<Etudiants> {
    return this.http.post<Etudiants>(this.apiUrl, {
      method: 'POST',
      Etudiants: Etudiants
    });
  }

  updateEtudiants(Etudiants: Etudiants): Observable<Etudiants> {
    return this.http.post<Etudiants>(this.apiUrl, {
      method: 'PUT',
      Etudiants: Etudiants
    });
  }

  deleteEtudiants(id: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      method: 'DELETE',
      id: id
    });
  }
}
