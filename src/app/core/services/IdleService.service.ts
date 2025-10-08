// idle.service.ts
import { Token } from '@angular/compiler';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private timeoutId: any;
  private readonly timeoutDuration = 9 * 60 * 60 * 1000  ;// 15 min (changer selon ton besoin)

  constructor(private router: Router, private ngZone: NgZone,private authServie:AuthentificationService) {
    this.startWatching();
  }

  private startWatching(): void {
    // Écoute les événements d'activité
    ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(event =>
      window.addEventListener(event, () => this.resetTimer())
    );
    this.resetTimer();
  }

  private resetTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Utilise NgZone pour éviter des problèmes de détection de changements Angular
    this.ngZone.runOutsideAngular(() => {
      this.timeoutId = setTimeout(() => {
        this.ngZone.run(() => this.logout());
      }, this.timeoutDuration);
    });
  }

  private logout(): void {
    // Supprimer le token ou session
    //console.log(localStorage)
    localStorage.removeItem('token'); // adapte si tu utilises JWT
    sessionStorage.clear();
    //(localStorage)
    this.authServie.logOut();
    // Redirection vers login
    this.router.navigate(['/deliacte/login']);
    alert('Vous avez été déconnecté pour cause d’inactivité.');
  }
}
