import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { AlertEcoleComponent } from 'src/app/alert-ecole/alert-ecole.component';
import { throwError } from 'rxjs';
import { Enseignant } from 'src/app/models/enseignant.model';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss']
})
export class EnseignantComponent {

  id!:string

  nom_enseignant!:string
  prenom_enseignant!:string
  adresse!:string
  telephone!:string
  email!:string
  statut!:string
  civilite!:string
  nationalite!:string
  pays!:string
  matieres_enseigne!:string
  etablissement!:string
  date_de_naissance!:string


  @Input() action !: "create" | "edit" | "view"
  dataSource: any;
  isLoading!: boolean;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public _location : Location,
    private enseignantService:EnseignantService

  ) {}

  ngOnInit(): void {

    if (this.id) {
       this.initForUpdate(this.id)
    }
    console.log(this.id);
    console.log(this.action)
  }

  initForUpdate(enseignantID: string) {
    this.enseignantService.geById(enseignantID).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        return [];
      })
    ).subscribe((data) => {
      console.log(data);
      
      this.id = (data as any).message.id;
      this.adresse = (data as any).message.adresse;
      this.civilite = (data as any).message.civilite;
      this.email = (data as any).message.email;
      this.etablissement = (data as any).message.etablissement;
      this.matieres_enseigne = (data as any).message.matieres_enseigne;
      this.date_de_naissance = (data as any).message.date_de_naissance;
      this.nationalite = (data as any).message.nationalite;
      this.nom_enseignant = (data as any).message.nom_enseignant;
      this.prenom_enseignant = (data as any).message.prenom_enseignant;
      this.statut = (data as any).message.statut;
      this.civilite = (data as any).message.civilite;
      this.telephone = (data as any).message.telephone;
      this.pays = (data as any).message.pays;
    
    
    });
    
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  } 

  onSubmitForm(form: NgForm) {

    this.isLoading = true
    const Enseignant: Enseignant = form.value;

    Enseignant.id = this.id


    if(this.action === 'edit') {
       this.enseignantService.update(Enseignant).pipe(catchError((error:HttpErrorResponse)=>{
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
      
      this.enseignantService.add(Enseignant).pipe(catchError((error:HttpErrorResponse)=>{
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
