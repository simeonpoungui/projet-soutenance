export class InscriptionEtudiant {

    id!:string
    numero!:string
    etablissement!:string
    annee!:string
    prenom_etudiant!:string
    niveau!:string
    somme!:string
   
   
}

export class EtudiantApiListe {
    
    code!:string
    message!:InscriptionEtudiant[]
   
}