import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  login(user:User):Observable<User[]>{
    return this.httpClient.get<User[]>("http://localhost:3000/users?email="+user.email+"&password="+user.password)
  }

  isLoggedIn():boolean{
    const token = localStorage.getItem('token')
    if(token){
      return true;
    }
    else{
      return false;
    }
  }

  addUser(user:User):Observable<User>{
      return this.httpClient.post<User>("http://localhost:3000/users",user)
  }

  getUsers():Observable<User[]>{
      return this.httpClient.get<User[]>("http://localhost:3000/users")
  }

  logOut(){
    localStorage.removeItem('token')
  }
}
