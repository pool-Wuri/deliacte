import { Component } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { AuthentificationService } from 'src/app/core/services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: User | null = null;

  constructor(private authService:AuthentificationService){

  }

  ngOnInit(){
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user)
    }
  }

  deconnecter(){
    this.authService.logOut();
  }
}
