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
import { InscriptionEtudiant } from '../../models/inscriptionEtudiant.model';

@Component({
  selector: 'app-inscription-etudiant',
  templateUrl: './inscription-etudiant.component.html',
  styleUrls: ['./inscription-etudiant.component.scss']
})
export class InscriptionEtudiantComponent {


  @Input() action !: "create" | "edit" | "view"

  id!:string
  numero!:string
  etablissement!:string
  annee!:string
  prenom_etudiant!:string
  niveau!:string
  somme!:string

  isLoading!:boolean
  message!: string;
  dataSource: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private inscriptionService:InscriptionService,
    public _location : Location,

  ) {}

  ngOnInit(): void {

    if (this.id) {
       this.initForUpdate(this.id)
    }
    console.log(this.id);
    console.log(this.action)
  }

  initForUpdate(inscriptionID: string) {
    this.inscriptionService.getEtudiantById(inscriptionID).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        return [];
      })
    ).subscribe((data) => {
      console.log(data);
      
      this.id = (data as any).message.id;
      this.numero = (data as any).message.numero;
      this.etablissement = (data as any).message.etablissement;
      this.annee = (data as any).message.annee;
      this.prenom_etudiant = (data as any).message.prenom_etudiant;
      this.niveau = (data as any).message.niveau;
      this.somme = (data as any).message.somme;
    });
    
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  } 

  onSubmitForm(form: NgForm) {

    this.isLoading = true
    const InscriptionEtudiant: InscriptionEtudiant = form.value;

    InscriptionEtudiant.id = this.id


    if(this.action === 'edit') {
       this.inscriptionService.updateEtudiant(InscriptionEtudiant).pipe(catchError((error:HttpErrorResponse)=>{
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
      
      this.inscriptionService.addEtudiants(InscriptionEtudiant).pipe(catchError((error:HttpErrorResponse)=>{
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
