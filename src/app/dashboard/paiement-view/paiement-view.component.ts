import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/alert/alert.component';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { InscriptionService } from '../../services/inscription.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PaiementService } from 'src/app/services/paiement.service';
import { PaiementComponent } from 'src/app/forms/paiement/paiement.component';
import { Paiement } from '../../models/paiement.model';

@Component({
  selector: 'app-paiement-view',
  templateUrl: './paiement-view.component.html',
  styleUrls: ['./paiement-view.component.scss']
})
export class PaiementViewComponent {

  dataSource!: any;
  displayedColumns = [
    'nom',
    'prenom',
    'email',
    'options',
    // 'adresse',
    'domaine',
    'cycle',
    'montant',
    'Actions'
  ];


  isLoading!:boolean

  constructor(
    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private paiementService:PaiementService
  ) { }


  ngOnInit(): void {
    
     this.initpaiement()
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  initpaiement() {this.isLoading=true;
    this.paiementService.getPaiement().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.isLoading=false;
      this.dataSource = new MatTableDataSource(data.message);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  imprimer() {
    const url = 'http://localhost:8000/impression/liste/paiement';
    const newWindow = window.open(url, '_blank');
    
    // Vérifier si l'ouverture de la fenêtre a été bloquée par le navigateur
    if (newWindow === null) {
      alert('La fenêtre d\'impression a été bloquée par le navigateur. Veuillez autoriser les fenêtres contextuelles pour afficher le fichier PDF.');
    }
  }

  create() {
    const refview = this.dialog.open(PaiementComponent, {
    });
     refview.componentInstance.action = 'create';
  }

  edit(paiement: Paiement) {
    const ref = this.dialog.open(PaiementComponent, {
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.id = paiement.id;
  }


  view(paiement: Paiement) {
    const refview = this.dialog.open(PaiementComponent, {
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.id = paiement.id;
  }

   delete(Paiement:Paiement) {
     const ref = this.dialog.open(AlertComponent);
     ref.componentInstance.type = 'danger';
     ref.componentInstance.contenu =
       'Voulez vous supprimer le paiement de l\'etudiant ' + Paiement.nom + ' ?';
     ref.afterClosed().subscribe((result) => {
       if (result) {
         this.paiementService.delete(Paiement.id).pipe(catchError((error:HttpErrorResponse)=>{
           console.log(error.status);
           return []
         })).subscribe((data) => {
           console.log(data);
          location.reload()
         });
       }
     });
     console.log(Paiement);
   }


}
