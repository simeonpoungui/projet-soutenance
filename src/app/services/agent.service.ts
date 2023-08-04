import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgentListe } from '../models/agent.model';
import { Agent } from 'src/app/models/agent.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8000/recuperation/agents';
  private apiUrladd = 'http://localhost:8000/add/agents';
  private apiUrldelete = 'http://localhost:8000/delete/agents';
  private apiUrlupdate = 'http://localhost:8000/update/agents';

  getEtudiantss(): Observable<AgentListe> {
    return this.http.post<AgentListe>(this.apiUrl, {
      method: 'POST'
    });
  }

  geById(id: string): Observable<Agent[]> {
    const body = { method: 'POST', id: id };
    return this.http.post<Agent[]>(this.apiUrl, JSON.stringify(body));
  }

  add(agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(this.apiUrladd, {
      method: 'POST',
      Agent: agent
    });
  }

  upddate(agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(this.apiUrlupdate, {
      method: 'PUT',
      Agent: agent
    });
  }

  delete(id: string): Observable<any> {
    return this.http.post<any>(this.apiUrldelete, {
      method: 'DELETE',
      id: id
    });
  }
}
