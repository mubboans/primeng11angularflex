import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public http:HttpClient) { }

fnConvertText2Speech(type,periodType):Observable<any> {
  const body ={
    type:type,
    periodType:periodType
  }
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  const options = {
    headers: headers,
    responseType: 'arraybuffer' as 'json'
  };
  console.log(body);
  // const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.post<any>(`${environment.serUrl}text-speech`,body,options).pipe(map((response: ArrayBuffer) =>{return response}),catchError(this.handleError))
}

  handleError(err:HttpErrorResponse){
    return throwError(err || err.message)
  }
}
