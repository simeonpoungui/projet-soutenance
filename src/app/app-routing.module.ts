import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';
import { AlertComponent } from './alert/alert.component';
import { InscriptionEtudiantViewComponent } from './dashboard/inscription-etudiant-view/inscription-etudiant-view.component';
import { EnseignantsViewComponent } from './dashboard/enseignants-view/enseignants-view.component';
import { AgentViewComponent } from './dashboard/agent-view/agent-view.component';
import { EtudiantsComponent } from './dashboard/etudiants/etudiants.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { CoursComponent } from './pages/cours/cours.component';
import { ContactComponent } from './pages/contact/contact.component';
import { InscriptionEtudiantComponent } from './forms/inscription-etudiant/inscription-etudiant.component';
import { PreinscriptionEtudiantComponent } from './forms/preinscription-etudiant/preinscription-etudiant.component';
import { PreinscriptionEtudiantViewComponent } from './dashboard/preinscription-etudiant-view/preinscription-etudiant-view.component';
import { PaiementComponent } from './forms/paiement/paiement.component';
import { PaiementViewComponent } from './dashboard/paiement-view/paiement-view.component';
import { EnseignantComponent } from './forms/enseignant/enseignant.component';
import { AgentComponent } from './forms/agent/agent.component';
import { EvenementComponent } from './pages/evenement/evenement.component';
import { BlogComponent } from './pages/blog/blog.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { ConnecComponent } from './pages/connec/connec.component';
import { InscrireComponent } from './pages/inscrire/inscrire.component';
import { AboutComponent } from './pages/about/about.component';
import { ConnexionFormComponent } from './connexion-form/connexion-form.component';


const routes: Routes = [


  {path: "inscription/list", component: InscriptionEtudiantViewComponent},
  {path: "inscription/ajout", component: InscriptionEtudiantComponent},
  {path: "inscription/:action/:inscriptionID", component: InscriptionEtudiantComponent},

  {path: "paiement/list", component: PaiementViewComponent},
  {path: "paiement/ajout", component: PaiementComponent},
  {path: "paiement/:action/:paiementID", component: PaiementComponent},

  {path: "preinscription/list", component: PreinscriptionEtudiantViewComponent},
  {path: "preinscription/ajout", component: PreinscriptionEtudiantComponent},
  {path: "preinscription/:action/:preinscriptionID", component: PreinscriptionEtudiantComponent},

  {path: "preinscription/list", component: PreinscriptionEtudiantViewComponent},

  {path: "enseignant/list", component: EnseignantsViewComponent},
  {path: "enseignant/ajout", component: EnseignantComponent},
  {path: "enseignant/:action/:enseignantID", component: EnseignantComponent},

  {path: "agent/list", component: AgentViewComponent},
  {path: "agent/ajout", component: AgentComponent},
  {path: "agent/:action/:agentID", component: AgentComponent},

  {path: "etudiant/list", component: EtudiantsComponent},

  {path: "", component: AccueilComponent},
  {path: "contacts", component: ContactComponent},
  {path: "cours", component: CoursComponent},
  {path: "evenements", component: EvenementComponent},
  {path: "blogs", component: BlogComponent},
  {path: "teachers", component: TeacherComponent},
  {path: "preinscription", component: ConnecComponent},
  {path: "inscrire", component: InscrireComponent},
  {path: "about", component: AboutComponent},



  {path: "connexionform", component: ConnexionFormComponent},
  {path: "tab", component: HomeComponent},
  {path: "alert", component: AlertComponent},
  {path: "**", component: PageNoFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
