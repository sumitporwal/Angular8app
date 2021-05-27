import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl='https://jsonplaceholder.typicode.com/';
  constructor(private http:HttpClient) { }
  getUserList():Observable<any>{
    return this.http.get(`${this.baseUrl}`+`users`);
  }
}
