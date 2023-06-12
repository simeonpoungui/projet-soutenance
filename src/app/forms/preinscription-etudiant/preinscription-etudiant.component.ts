import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { AlertEcoleComponent } from 'src/app/alert-ecole/alert-ecole.component';
import { throwError } from 'rxjs';
import { InscriptionService } from '../../services/inscription.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PreinscriptionEtudiant } from 'src/app/models/preinscription.model';
import { PreinscriptionService } from 'src/app/services/preinscription.service';


@Component({
  selector: 'app-preinscription-etudiant',
  templateUrl: './preinscription-etudiant.component.html',
  styleUrls: ['./preinscription-etudiant.component.scss']
})
export class PreinscriptionEtudiantComponent {

  @Input() action !: "create" | "edit" | "view"

  id!: string;
  nom_etudiant!: string;
  prenom_etudiant!: string;
  genre!: string;
  telephone!: string;
  date_naissance!: string;
  parcours!: string;
  niveau!: string;
  email!: string;
  etablissement!: string;
  // civilite!: string;
  adresse!: string;
  residence!: string;
  departement!: string;
  image!: string;
  quittance!: string;
  cycle!: string;
  CNI!: string;
  bac!: string;
  session!: string;
  mension!: string;
  lycee!: string;
  pays!: string;
  serie!: string;
  
  dataSource: any;
  isLoading!: boolean;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private preinscriptionService:PreinscriptionService,
    public _location : Location,

  ) {}

  ngOnInit(): void {

    if (this.id) {
       this.initForUpdate(this.id)
    }
    console.log(this.id);
    console.log(this.action)
  }

  initForUpdate(preinscriptionID: string) {
    this.preinscriptionService.getEtudiantById(preinscriptionID).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        return [];
      })
    ).subscribe((data) => {
      console.log(data);
      
      this.id = (data as any).message.id;
      this.etablissement = (data as any).message.etablissement;
      this.prenom_etudiant = (data as any).message.prenom_etudiant;
      this.parcours = (data as any).message.parcours;
      this.CNI = (data as any).message.CNI;
      this.nom_etudiant = (data as any).message.nom_etudiant;
      this.niveau = (data as any).message.niveau;
      this.adresse = (data as any).message.adresse;
      this.bac = (data as any).message.bac;
      this.cycle = (data as any).message.cycle;
      // this.civilite = (data as any).message.civilite;
      this.date_naissance = (data as any).message.date_naissance;
      this.departement = (data as any).message.departement;
      this.email = (data as any).message.email;
      this.image = (data as any).message.image;
      this.lycee = (data as any).message.lycee;
      this.mension = (data as any).message.mension;
      this.quittance = (data as any).message.quittance;

      
    });
    
  }



  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
}

onSubmitForm(form: NgForm) {

  this.isLoading = true
  const PreinscriptionEtudiant: PreinscriptionEtudiant = form.value;

  PreinscriptionEtudiant.id = this.id


  if(this.action === 'edit') {
     this.preinscriptionService.updateEtudiants(PreinscriptionEtudiant).pipe(catchError((error:HttpErrorResponse)=>{
       console.log(error.status);
       this.isLoading = false
       location.reload()
       return []
     })).subscribe(
       (data) => {

         console.log(data);
       
       },
       (Error) => console.log(Error)
     );
  } else {
    
    this.preinscriptionService.addEtudiants(PreinscriptionEtudiant).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      this.isLoading = false
      location.reload()
      return []
    })).subscribe(
      (data) => {

        console.log(data);
        
      },
      (error) => console.log(error)
    );
  }
}


}
