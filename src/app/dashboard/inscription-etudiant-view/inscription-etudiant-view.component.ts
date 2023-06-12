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
import { InscriptionEtudiant } from 'src/app/models/inscriptionEtudiant.model';
import { InscriptionEtudiantComponent } from '../../forms/inscription-etudiant/inscription-etudiant.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscription-etudiant-view',
  templateUrl: './inscription-etudiant-view.component.html',
  styleUrls: ['./inscription-etudiant-view.component.scss']
})
export class InscriptionEtudiantViewComponent {

  dataSource!: any;
  displayedColumns = [
    'numero',
    'prenom_etudiant',
    'etablissement',
    'niveau',
    'somme',
    'annee',
    'Actions',
  ];  

  isLoading!:boolean

  constructor(
    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private inscription : InscriptionService,
    private http:HttpClient
  ) { }


  ngOnInit(): void {
    
     this.initInscriptionEtudiant()
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  initInscriptionEtudiant() {this.isLoading=true;
    this.inscription.getEtudiantss().pipe(catchError((error:HttpErrorResponse)=>{
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
    const url = 'http://localhost:8000/impression/liste/etudiants/inscrits';
    const newWindow = window.open(url, '_blank');
    
    // Vérifier si l'ouverture de la fenêtre a été bloquée par le navigateur
    if (newWindow === null) {
      alert('La fenêtre d\'impression a été bloquée par le navigateur. Veuillez autoriser les fenêtres contextuelles pour afficher le fichier PDF.');
    }
  }
  

  // imprimer() {
  //   const url = 'http://localhost:8000/impression/liste/etudiants/inscrits';
  //   this.http.get(url, { responseType: 'blob' })
  //     .subscribe(response => {
  //       const blob = new Blob([response], { type: 'application/pdf' });
  //       const url = window.URL.createObjectURL(blob);
        
  //       // Ouvrir le fichier PDF dans une nouvelle fenêtre pour l'impression
  //       const printWindow = window.open(url, '_blank');
        
  //       if (printWindow) {
  //         printWindow.onload = () => {
  //           printWindow.print();
  //         };
          
  //         // Révoquer l'URL de l'objet une fois l'impression terminée
  //         printWindow.onafterprint = () => {
  //           window.URL.revokeObjectURL(url);
  //         };
  //       } else {
  //         console.error('La fenêtre d\'impression a été bloquée.');
  //       }
  //     });
  // }
  
  
  
  create() {
    const refview = this.dialog.open(InscriptionEtudiantComponent, {
    });
     refview.componentInstance.action = 'create';
  }

  edit(inscription: InscriptionEtudiant) {
    const ref = this.dialog.open(InscriptionEtudiantComponent, {
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.id = inscription.id;
  }


  view(inscription: InscriptionEtudiant) {
    const refview = this.dialog.open(InscriptionEtudiantComponent, {
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.id = inscription.id;
  }

  delete(etudinantInscrit:InscriptionEtudiant) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.contenu =
      'Voulez vous supprimer cet etudiant ' + etudinantInscrit.prenom_etudiant + ' ?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.inscription.deleteEtudiant(etudinantInscrit.id).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data);
         location.reload()
        });
      }
    });
    console.log(etudinantInscrit);
  }

}
