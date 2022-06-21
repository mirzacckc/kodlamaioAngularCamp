import { MessageService } from 'primeng/api';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService:AuthService,private messageService:MessageService,private router:Router){
    
  }

  canActivate(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.authService.isLoggedIn()){
        return true;
      }
      else{
        this.router.navigate(["login"])
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed. Please Sign-In'
        })
        return false;

      }
  }
  
}
