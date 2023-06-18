
import { OwlModule } from 'ngx-owl-carousel';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrincipalComponent } from './principal/principal.component';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { AlertComponent } from './alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertEcoleComponent } from './alert-ecole/alert-ecole.component';
import {MatTabsModule} from '@angular/material/tabs';
import {CommonModule, DatePipe  } from '@angular/common';
import { PreinscriptionEtudiantViewComponent } from './dashboard/preinscription-etudiant-view/preinscription-etudiant-view.component';
import { InscriptionEtudiantViewComponent } from './dashboard/inscription-etudiant-view/inscription-etudiant-view.component';
import { EnseignantsViewComponent } from './dashboard/enseignants-view/enseignants-view.component';
import { AgentViewComponent } from './dashboard/agent-view/agent-view.component';
import { AgentComponent } from './forms/agent/agent.component';
import { InscriptionEtudiantComponent } from './forms/inscription-etudiant/inscription-etudiant.component';
import { PreinscriptionEtudiantComponent } from './forms/preinscription-etudiant/preinscription-etudiant.component';
import { EnseignantComponent } from './forms/enseignant/enseignant.component';
import { EtudiantsComponent } from './dashboard/etudiants/etudiants.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CoursComponent } from './pages/cours/cours.component';
import { PaiementViewComponent } from './dashboard/paiement-view/paiement-view.component';
import { PaiementComponent } from './forms/paiement/paiement.component';
import { EvenementComponent } from './pages/evenement/evenement.component';
import { BlogComponent } from './pages/blog/blog.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { ConnecComponent } from './pages/connec/connec.component';
import { InscrireComponent } from './pages/inscrire/inscrire.component';
import { AboutComponent } from './pages/about/about.component';
import { ConnexionFormComponent } from './connexion-form/connexion-form.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrincipalComponent,
    PageNoFoundComponent,
    AlertComponent,
    AlertEcoleComponent,
    PreinscriptionEtudiantViewComponent,
    InscriptionEtudiantViewComponent,
    EnseignantsViewComponent,
    AgentViewComponent,
    AgentComponent,
    InscriptionEtudiantComponent,
    PreinscriptionEtudiantComponent,
    EnseignantComponent,
    EtudiantsComponent,
    AccueilComponent,
    ContactComponent,
    CoursComponent,
    PaiementViewComponent,
    PaiementComponent,
    EvenementComponent,
    BlogComponent,
    TeacherComponent,
    ConnecComponent,
    InscrireComponent,
    AboutComponent,
    ConnexionFormComponent,



  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatTabsModule,
    CommonModule,
    OwlModule,

  ],
  providers: [
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
