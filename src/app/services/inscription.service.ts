import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {InscriptionEtudiant } from '../models/inscriptionEtudiant.model';
import {EtudiantApiListe } from '../models/inscriptionEtudiant.model';


@Injectable({
  providedIn: 'root'
})


export class InscriptionService {

  constructor(private http : HttpClient) { }

  private apiUrl = 'http://localhost:8000/recuperation/Etudiant';
  private apiUrlinscription = 'http://localhost:8000/add/Etudiant';
  private apiUrlDelete = 'http://localhost:8000/delete/Etudiant';
  private apiUrlUpdate = 'http://localhost:8000/update/Etudiant';
  private impressionListe = 'http://localhost:8000/impression/liste/etudiants/inscrits'


  getEtudiantss(): Observable<EtudiantApiListe> {
    return this.http.post<EtudiantApiListe>(this.apiUrl, {
      method: 'POST'
    });
  }

  addEtudiants(etudiantData: InscriptionEtudiant): Observable<InscriptionEtudiant> {
    return this.http.post<InscriptionEtudiant>(this.apiUrlinscription, etudiantData);
  }


  updateEtudiant(etudiant: any): Observable<InscriptionEtudiant> {
    const url = `${this.apiUrlUpdate}`;
    return this.http.post<any>(url, etudiant);
  }

  getEtudiantById(inscriptionID: string): Observable<EtudiantApiListe> {
    const url = this.apiUrl;
    const body = { id: inscriptionID };
    return this.http.post<EtudiantApiListe>(url, body);
  }

  deleteEtudiant(id: string): Observable<InscriptionEtudiant> {[]
    const url = `${this.apiUrlDelete}`;
    const body = { id: id };
    return this.http.post<any>(url, body);
  }

}
