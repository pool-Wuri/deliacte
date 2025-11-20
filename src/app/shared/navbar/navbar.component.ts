import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { AuthentificationService } from 'src/app/core/services/authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user: User | null = null;
  ORG_ADMIN = 'ORG_ADMIN'; // Définir la constante
SUPER_ADMIN= 'SUPER_ADMIN'
PROCEDURE_MANAGER='PROCEDURE_MANAGER'
CITOYEN='CITOYEN';
AGENT='AGENT';
isDesktop: boolean = window.innerWidth >= 1024;

constructor(private authService:AuthentificationService){}
@Input() sidebarOpen: boolean = false;
  @Output() sidebarOpenChange = new EventEmitter<boolean>();

ngOnInit(): void {
  const userData = localStorage.getItem('user');
  if (userData) {
    this.user = JSON.parse(userData);
    //console.log(this.user)
  }
 }
 deconnecter(){
  this.authService.logOut();
}

@HostListener('window:resize', ['$event'])
onResize(event: any) {
  this.isDesktop = event.target.innerWidth >= 1024;

  if (this.isDesktop) {
    this.sidebarOpen = true; // force visible sur desktop
  } else {
    this.sidebarOpen = false; // fermée sur mobile
  }
}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarOpenChange.emit(this.sidebarOpen);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const sidebar = document.querySelector('aside');
    const hamburger = document.querySelector('button');

    if (this.sidebarOpen && sidebar && !sidebar.contains(target) && hamburger && !hamburger.contains(target)) {
      this.sidebarOpen = false;
      this.sidebarOpenChange.emit(this.sidebarOpen);
    }
  }
  
  @HostListener('document:keydown.escape', ['$event'])
  onEscPress(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (this.sidebarOpen) {
      this.sidebarOpen = false;
      this.sidebarOpenChange.emit(this.sidebarOpen);
    }
  }
  
  }
  


