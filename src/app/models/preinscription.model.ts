export class PreinscriptionEtudiant {
  id!: string;
  nom_etudiant!: string;
  prenom_etudiant!: string;
  genre!: string;
  telephone!: string;
  date_naissance!: string;
  parcours!: string;
  niveau!: string;
  email!: string;
  etablissement!: string;
  civilite!: string;
  adresse!: string;
  residence!: string;
  departement!: string;
  image!: string;
  quittance!: string;
  cycle!: string;
  CNI!: string;
  bac!: string;
  session!: string;
  mension!: string;
  lycee!: string;
  pays!: string;
  serie!: string;
}

export class PreinscriptionEtudiantApiListe {
    
  code!:string
  message!:PreinscriptionEtudiant[]
 
}
