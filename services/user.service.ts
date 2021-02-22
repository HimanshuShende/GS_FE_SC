import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PutUserData, ReqRes } from 'formatters/formatter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;
  constructor(private http: HttpClient) { 
    this.url = "https://reqres.in"
  }

  // following code uses some custom defined interfaces (defined in the formatters/formatter.ts)

  // on call, a GET request is made to the url along with the per_page query
  getUsers(per_page:number): Observable<ReqRes>{
    return this.http.get<ReqRes>(`${this.url}/api/users?per_page=${per_page}`)
  }

  // on call, a DELETE request is made to the url
  deleteUser(id:number): Observable<number>{
    return this.http.delete<number>(`${this.url}/api/users/${id}`)
  }

  // on call, a PUT request is made to the url along with the postData
  updateUser(id:number, postData: PutUserData): Observable<PutUserData>{
    return this.http.put<PutUserData>(`${this.url}/api/users/${id}`, postData)
  }
}
