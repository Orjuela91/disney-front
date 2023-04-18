import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiExternaService {

  constructor(private http: HttpClient) { }

  public getPagination(page: number = 1, pageSize: number = 10): Observable<any> {
    let URL_PAGINATION: string = "https://api.disneyapi.dev/character?page="+ page + "&pageSize=" + pageSize;

    return this.http.get(URL_PAGINATION);
  }
}
