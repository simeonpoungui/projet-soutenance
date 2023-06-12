import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement } from '../models/paiement.model';
import { PaiementListe } from '../models/paiement.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private apiUrl = 'http://localhost:8000/recuperation/paiement';
  private apiUrlinscription = 'http://localhost:8000/add/paiement';
  private apiUrlDelete = 'http://localhost:8000/delete/paiement';
  private apiUrlUpdate = 'http://localhost:8000/update/paiement';

  constructor(private http:HttpClient) { }



  getPaiement(): Observable<PaiementListe> {
    return this.http.post<PaiementListe>(this.apiUrl, {
      method: 'POST'
    });
  }

  geById(PaiementID: string): Observable<Paiement[]> {
    const body = { method: 'POST', id: PaiementID };
    return this.http.post<Paiement[]>(this.apiUrl, JSON.stringify(body));
  }

  add(Paiement: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(this.apiUrlinscription, Paiement);
  }

  update(Paiement: Paiement): Observable<Paiement> {
    const url = `${this.apiUrlUpdate}`;
    return this.http.post<Paiement>(url, Paiement);
  }

  delete(id: string): Observable<Paiement> {
    return this.http.post<Paiement>(this.apiUrlDelete, {
      method: 'DELETE',
      id: id
    });
  }

}
