export class Agent{

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

}

export class AgentListe {
    
    code!:string
    message!:Agent[]
   
}