import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/alert/alert.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PreinscriptionService } from 'src/app/services/preinscription.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PreinscriptionEtudiantComponent } from '../../forms/preinscription-etudiant/preinscription-etudiant.component';
import { PreinscriptionEtudiant } from '../../models/preinscription.model';

@Component({
  selector: 'app-preinscription-etudiant-view',
  templateUrl: './preinscription-etudiant-view.component.html',
  styleUrls: ['./preinscription-etudiant-view.component.scss']
})
export class PreinscriptionEtudiantViewComponent {

  dataSource!: any;
  displayedColumns = [
    'nom_etudiant',
    'prenom_etudiant',
    // 'genre',
    'telephone',
    'parcours',
    'niveau',
    'etablissement',
    // 'civilite',
    // 'adresse',
    'Actions',
  ];

  isLoading!:boolean

  constructor(
    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private preinscription : PreinscriptionService
  ) { }


  ngOnInit(): void {
    
     this.initPreInscriptionEtudiant()
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  initPreInscriptionEtudiant() {this.isLoading=true;
    this.preinscription.getEtudiantss().pipe(catchError((error:HttpErrorResponse)=>{
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

  imprimer() {
    const url = 'http://localhost:8000/impression/liste/etudiants/preinscrits';
    const newWindow = window.open(url, '_blank');
    
    // Vérifier si l'ouverture de la fenêtre a été bloquée par le navigateur
    if (newWindow === null) {
      alert('La fenêtre d\'impression a été bloquée par le navigateur. Veuillez autoriser les fenêtres contextuelles pour afficher le fichier PDF.');
    }
  }


  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  edit(id: string){
    this.router.navigateByUrl('/preinscription/edit/' + id);
  }


  view(id: string){
    this.router.navigateByUrl('/preinscription/view/' +  id);
  }



  delete(preinscription:PreinscriptionEtudiant) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.contenu =
      'Voulez vous supprimer cet etudiant ' + preinscription.prenom_etudiant + ' ?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.preinscription.deleteEtudiant(preinscription.id).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data);
         location.reload()
        });
      }
    });
    console.log(preinscription);
  }


}
