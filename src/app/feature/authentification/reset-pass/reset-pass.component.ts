import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/services/authentification.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements AfterViewInit {
  newpass!: string;
  passConfirm!: string;
  submitted: boolean = false;
  id!: number;

  @ViewChild('strengthBar') strengthBar!: ElementRef<HTMLDivElement>;
  @ViewChild('strengthText') strengthText!: ElementRef<HTMLSpanElement>;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthentificationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    // Écoute les changements de newpass pour mettre à jour la force
    const input = document.getElementById('new-password') as HTMLInputElement;
    if (input) {
      input.addEventListener('input', () => this.updateStrength(input.value));
    }
  }

  private calculateStrength(password: string): number {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }

  private updateStrength(password: string): void {
    const bar = this.strengthBar.nativeElement;
    const text = this.strengthText.nativeElement;

    const score = this.calculateStrength(password);
    bar.className = 'h-2 rounded-full transition-all duration-300';

    switch (score) {
      case 0:
      case 1:
        bar.style.width = '25%';
        bar.classList.add('bg-red-500');
        text.textContent = 'Faible';
        text.className = 'font-semibold text-red-500';
        break;
      case 2:
        bar.style.width = '50%';
        bar.classList.add('bg-yellow-500');
        text.textContent = 'Moyen';
        text.className = 'font-semibold text-yellow-500';
        break;
      case 3:
        bar.style.width = '75%';
        bar.classList.add('bg-green-500');
        text.textContent = 'Bon';
        text.className = 'font-semibold text-green-500';
        break;
      case 4:
        bar.style.width = '100%';
        bar.classList.add('bg-green-700');
        text.textContent = 'Excellent';
        text.className = 'font-semibold text-green-700';
        break;
      default:
        bar.style.width = '0%';
        text.textContent = '—';
        text.className = 'font-semibold text-gray-400';
    }
  }

  validerPass(): void {
    this.submitted = true;

    if (this.newpass !== this.passConfirm) return;

    const data = {
      email: 'string',
      password: this.newpass,
      encodeEmail: this.id
    };

    this.confirmationService.confirm({
      message: 'Confirmez mot de passe ?',
      header: 'Confirmation',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authService.validerPass(data).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Mot de passe modifié avec succès', life: 3000 });
            this.router.navigate(['/deliacte/login']);
          },
          error: (err) => console.error(err)
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Annulé', detail: 'Opération annulée', life: 3000 });
      }
    });
  }

  annuler(): void {
    this.router.navigate(['/deliacte/login']);
  }
}
