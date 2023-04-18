import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personaje } from './Personaje';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  constructor(private http: HttpClient) { }

  public getPagination(pageNo: number = 0, pageSize: number = 10): Observable<any> {

    let URL_PAGINATION: string = "http://localhost:8080/personajes/" + pageNo +"/" + pageSize;

    return this.http.get(URL_PAGINATION);
  }

  public savePersonaje(personaje: Personaje): Observable<any> {
    return this.http.post("http://localhost:8080/personajes", personaje);
  }

  public updatePersonaje(id: number, personaje: Personaje): Observable<any> {
    return this.http.put("http://localhost:8080/personajes/" + id, personaje);
  }

  public deletePersonaje(id: number): Observable<any> {
    return this.http.delete("http://localhost:8080/personajes/" + id);
  }
}
