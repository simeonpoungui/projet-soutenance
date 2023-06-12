
import { ConnexionService } from './services/connexion.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gestion-Clientele';
  nomPersonnel = "rosly";
  isLogin!: boolean;

  constructor(
    private connexionService: ConnexionService,
  ){}


}
