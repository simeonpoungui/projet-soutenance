import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreinscriptionEtudiant } from '../models/preinscription.model';
import { PreinscriptionEtudiantApiListe } from '../models/preinscription.model';

@Injectable({
  providedIn: 'root'
})
export class PreinscriptionService {

  private apiUrl = 'http://localhost:8000/recuperation/preinscriptionEtudiant';
  private apiUrlinscription = 'http://localhost:8000/add/preinscriptionEtudiant';
  private apiUrlDelete = 'http://localhost:8000/delete/preinscriptionEtudiant';
  private apiUrlUpdate = 'http://localhost:8000/update/preinscriptionEtudiant';

  constructor(private http : HttpClient) { }


  getEtudiantss(): Observable<PreinscriptionEtudiantApiListe> {
    return this.http.post<PreinscriptionEtudiantApiListe>(this.apiUrl, {
      method: 'POST'
    });
  }

  addEtudiants(preinscriptionEtudiant: PreinscriptionEtudiant): Observable<PreinscriptionEtudiant> {
    return this.http.post<PreinscriptionEtudiant>(this.apiUrlinscription, preinscriptionEtudiant);
  }


  updateEtudiants(Enseignant: PreinscriptionEtudiant): Observable<PreinscriptionEtudiant> {
    const url = `${this.apiUrlUpdate}`;
    return this.http.post<PreinscriptionEtudiant>(url, Enseignant);
  }

  getEtudiantById(preinscriptionID: string): Observable<PreinscriptionEtudiantApiListe> {
    const url = this.apiUrl;
    const body = { id: preinscriptionID };
    return this.http.post<PreinscriptionEtudiantApiListe>(url, body);
  }

  deleteEtudiant(id: string): Observable<PreinscriptionEtudiant> {[]
    const url = `${this.apiUrlDelete}`;
    const body = { id: id };
    return this.http.post<PreinscriptionEtudiant>(url, body);
  }

}
