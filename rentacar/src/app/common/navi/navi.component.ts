import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private authService:AuthService,private messageService:MessageService) { }

  ngOnInit(): void {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logOut(){
    this.authService.logOut()
    this.messageService.add({    
      severity: 'info',
      summary: 'You log out the system',
      detail: 'Please log in to the system'
    })
    setTimeout(() => {      
    }, 1000);
  }

}
