export class Paiement{

    id!:string
    nom!: string
    prenom!:string
    email!:string
    options!: string
    date_de_naissance!:string
    telephone!:string
    genre!:string
    domaine!: string
    specialite!:string
    adresse!: string
    cycle!: string
    montant!: string
    niveau!:string

}


export class PaiementListe {
    
    code!:string
    message!:Paiement[]
   
  }