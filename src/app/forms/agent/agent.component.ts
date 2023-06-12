import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { AlertEcoleComponent } from 'src/app/alert-ecole/alert-ecole.component';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Agent } from 'src/app/models/agent.model';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent {


  id!:string 
  nom_agent!:string 
  prenom_agent!:string 
  telephone!:string 
  email!:string 
  adresse!:string 
  nationalite!:string 
  role!:string 
  civilite!:string
  pays!:string

  @Input() action !: "create" | "edit" | "view"

  dataSource: any;
  isLoading!: boolean;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public _location : Location,
   private AgentService: AgentService

  ) {}

  ngOnInit(): void {

    if (this.id) {
       this.initForUpdate(this.id)
    }
    console.log(this.id);
    console.log(this.action)
  }

  initForUpdate(agentID: string) {
    this.AgentService.geById(agentID).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        return [];
      })
    ).subscribe((data) => {
      console.log(data);
      
      this.nom_agent =  (data as any).message.nom_agent
      this.prenom_agent =  (data as any).message.prenom_agent
      this.telephone =  (data as any).message.telephone
      this.email =  (data as any).message.email 
      this.adresse =  (data as any).message.adresse 
      this.nationalite =  (data as any).message.nationalite 
      this.role =  (data as any).message.role 
      this.civilite =  (data as any).message.civilite
      this.pays =  (data as any).message.pays      
    
    });
    
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  } 

  onSubmitForm(form: NgForm) {

    this.isLoading = true
    const agent: Agent = form.value;

    agent.id = this.id


    if(this.action === 'edit') {
       this.AgentService.upddate(agent).pipe(catchError((error:HttpErrorResponse)=>{
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
      
      this.AgentService.add(agent).pipe(catchError((error:HttpErrorResponse)=>{
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
