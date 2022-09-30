import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthlogService {
  //  headers = new HttpHeaders({'Content-Type': 'application/json'},{'Access-Control-Allow-Origin': '*'});
  // .set('Content-Type', 'application/json')
 url = "https://admin.eniola.app/api/v1/login";
  constructor(public http:HttpClient) { }
  fnLogUser(data:any):Observable<any>{
    const dataa={
      headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:61002/' },
      body:data
    }
    return this.http.post<any>(this.url, dataa)
  }
}
