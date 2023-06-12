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
import { Agent } from 'src/app/models/agent.model';
import { AgentService } from 'src/app/services/agent.service';
import { AgentComponent } from 'src/app/forms/agent/agent.component';
import { PrincipalComponent } from '../../principal/principal.component';

@Component({
  selector: 'app-agent-view',
  templateUrl: './agent-view.component.html',
  styleUrls: ['./agent-view.component.scss']
})
export class AgentViewComponent {

  @ViewChild(PrincipalComponent)PrincipalComponent!: PrincipalComponent;

  dataSource!: any;
  displayedColumns = [
    'nom_agent',
    'prenom_agent',
    'telephone',
    'email',
    'adresse',
    // 'nationalite',
    // 'role',
    'pays',
    // 'civilite',
    'Actions'
  ];


  isLoading!:boolean

  constructor(
    private router:Router,
    private dialog: MatDialog,
    public _location:Location,
    private agentService:AgentService
  ) { }


  ngOnInit(): void {
    
     this.initAgent()
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  initAgent() {this.isLoading=true;
    this.agentService.getEtudiantss().pipe(catchError((error:HttpErrorResponse)=>{
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
    const url = 'http://localhost:8000/impression/liste/agents';
    const newWindow = window.open(url, '_blank');
    
    // Vérifier si l'ouverture de la fenêtre a été bloquée par le navigateur
    if (newWindow === null) {
      alert('La fenêtre d\'impression a été bloquée par le navigateur. Veuillez autoriser les fenêtres contextuelles pour afficher le fichier PDF.');
    }
  }

  create() {
    const refview = this.dialog.open(AgentComponent, {
    });
     refview.componentInstance.action = 'create';
  }

  edit(agent: Agent) {
    const ref = this.dialog.open(AgentComponent, {
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.id = agent.id;
  }


  view(agent: Agent) {
    const refview = this.dialog.open(AgentComponent, {
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.id = agent.id;
  }

  // delete(Enseignant:InscriptionEtudiant) {
  //   const ref = this.dialog.open(AlertComponent);
  //   ref.componentInstance.type = 'danger';
  //   ref.componentInstance.contenu =
  //     'Voulez vous supprimer cet etudiant ' + Enseignant.prenom_etudiant + ' ?';
  //   ref.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.EnseignantService.getEtudiantss().pipe(catchError((error:HttpErrorResponse)=>{
  //         console.log(error.status);
  //         return []
  //       })).subscribe((data) => {
  //         console.log(data);
  //        location.reload()
  //       });
  //     }
  //   });
  //   console.log(Enseignant);
  // }



}
