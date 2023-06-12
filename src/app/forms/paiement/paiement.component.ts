import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { AlertEcoleComponent } from 'src/app/alert-ecole/alert-ecole.component';
import { throwError } from 'rxjs';
import { PaiementService } from 'src/app/services/paiement.service';
import { Paiement } from '../../models/paiement.model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent {

  @Input() action !: "create" | "edit" | "view"

  id!:string
  nom!: string
  prenom!:string
  email!:string
  options!: string
  date_de_naissance!:string
  telephone!:string
  genre!:string
  domaine!: string
  specialite!:string
  adresse!: string
  cycle!: string
  montant!: string
  niveau!:string
  dataSource: any;
  isLoading!: boolean;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public _location : Location,
    private PaiementService:PaiementService

  ) {}

  ngOnInit(): void {

    if (this.id) {
       this.initForUpdate(this.id)
    }
    console.log(this.id);
    console.log(this.action)
  }

  initForUpdate(paiementID: string) {
    this.PaiementService.geById(paiementID).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        return [];
      })
    ).subscribe((data) => {
      console.log(data);
      
      this.nom = (data as any).message.nom
      this.prenom = (data as any).message.prenom
      this.email = (data as any).message.email
      this.options = (data as any).message.options  
      this.date_de_naissance = (data as any).message.date_de_naissance 
      this.telephone = (data as any).message.telephone
      this.genre = (data as any).message.genre 
      this.domaine = (data as any).message.domaine  
      this.specialite = (data as any).message.specialite 
      this.adresse = (data as any).message.adresse  
      this.cycle = (data as any).message.cycle  
      this.montant = (data as any).message.montant  
      this.niveau = (data as any).message.niveau 
    });
    
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  } 

  onSubmitForm(form: NgForm) {

    this.isLoading = true
    const Paiement: Paiement = form.value;

    Paiement.id = this.id


    if(this.action === 'edit') {
       this.PaiementService.update(Paiement).pipe(catchError((error:HttpErrorResponse)=>{
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
      
      this.PaiementService.add(Paiement).pipe(catchError((error:HttpErrorResponse)=>{
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
