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

  getUsers(per_page:number): Observable<ReqRes>{
    return this.http.get<ReqRes>(`${this.url}/api/users?per_page=${per_page}`)
  }

  deleteUser(id:number): Observable<number>{
    return this.http.delete<number>(`${this.url}/api/users/${id}`)
  }

  updateUser(id:number, postData: PutUserData): Observable<PutUserData>{
    return this.http.put<PutUserData>(`${this.url}/api/users/${id}`, postData)
  }
}
