export class Enseignant{

  
  id!:string
  nom_enseignant!:string
  prenom_enseignant!:string
  adresse!:string
  telephone!:string
  email!:string
  statut!:string
  civilite!:string
  nationalite!:string
  pays!:string
  matieres_enseigne!:string
  etablissement!:string
  date_de_naissance!:string


}

export class EnseignantListe {
    
  code!:string
  message!:Enseignant[]
 
}