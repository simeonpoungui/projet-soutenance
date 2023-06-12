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
import { EnseignantService } from 'src/app/services/enseignant.service';
import { EnseignantComponent } from 'src/app/forms/enseignant/enseignant.component';
import { Enseignant } from 'src/app/models/enseignant.model';

@Component({
  selector: 'app-enseignants-view',
  templateUrl: './enseignants-view.component.html',
  styleUrls: ['./enseignants-view.component.scss']
})
export class EnseignantsViewComponent {

  dataSource!: any;
  displayedColumns = [

    'nom_enseignant',
    'prenom_enseignant',
    // 'adresse',
    'telephone',
    'civilite',
    // 'nationalite',
    'matieres_enseigne',
    'etablissement',
    'Actions'
  ];

  isLoading!:boolean

  constructor(
    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private EnseignantService : EnseignantService
  ) { }


  ngOnInit(): void {
    
     this.initEnseignant()
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  initEnseignant() {this.isLoading=true;
    this.EnseignantService.getEtudiantss().pipe(catchError((error:HttpErrorResponse)=>{
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

  create() {
    const refview = this.dialog.open(EnseignantComponent, {
    });
     refview.componentInstance.action = 'create';
  }

  edit(Enseignant: Enseignant) {
    const ref = this.dialog.open(EnseignantComponent, {
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.id = Enseignant.id;
  }


  view(Enseignant: Enseignant) {
    const refview = this.dialog.open(EnseignantComponent, {
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.id = Enseignant.id;
  }

  delete(Enseignant:Enseignant) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.contenu =
      'Voulez vous supprimer l\'enseignant ' + Enseignant.nom_enseignant + ' ?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.EnseignantService.delete(Enseignant.id).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data);
         location.reload()
        });
      }
    });
    console.log(Enseignant);
  }


 
}
