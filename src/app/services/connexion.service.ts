import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  API_URL: string = environment.apiUrl
  uriConnexion: string = "/V1/Connexion";


  constructor(
    private http: HttpClient,
    private router : Router
  ) { }


}

