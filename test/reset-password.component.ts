import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// Validateur personnalisé pour vérifier que les mots de passe correspondent
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const newPassword = control.get('newPassword')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  // Ne retourne une erreur que si le champ de confirmation a été touché et que les valeurs diffèrent
  return newPassword && confirmPassword && newPassword !== confirmPassword ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  
  // Visibilité des mots de passe
  newPasswordVisible = false;
  confirmPasswordVisible = false;

  // Icônes SVG sécurisées
  eyeIcon: SafeHtml;
  eyeOffIcon: SafeHtml;

  // Propriétés pour l'indicateur de force
  strengthText = '';
  strengthBarWidth = '0%';
  strengthBarColor = '';

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
    // Initialisation du formulaire réactif
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });

    // Sécurisation des SVG pour l'injection dans le HTML
    this.eyeIcon = this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>` );
    this.eyeOffIcon = this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>` );
  }

  ngOnInit(): void {
    // Écouter les changements sur le champ du nouveau mot de passe
    this.resetForm.get('newPassword')?.valueChanges.subscribe(password => {
      this.updatePasswordStrength(password);
    });
  }

  // Méthode pour basculer la visibilité d'un mot de passe
  togglePasswordVisibility(field: 'new' | 'confirm'): void {
    if (field === 'new') {
      this.newPasswordVisible = !this.newPasswordVisible;
    } else {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  // Méthode pour mettre à jour l'indicateur de force
  updatePasswordStrength(password: string): void {
    let score = 0;
    if (!password) {
        this.strengthText = '';
        this.strengthBarWidth = '0%';
        return;
    }
    if (password.length > 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 0: case 1:
        this.strengthBarWidth = '25%';
        this.strengthBarColor = 'bg-red-500';
        this.strengthText = 'Faible';
        break;
      case 2:
        this.strengthBarWidth = '50%';
        this.strengthBarColor = 'bg-yellow-500';
        this.strengthText = 'Moyen';
        break;
      case 3:
        this.strengthBarWidth = '75%';
        this.strengthBarColor = 'bg-green-500';
        this.strengthText = 'Bon';
        break;
      case 4:
        this.strengthBarWidth = '100%';
        this.strengthBarColor = 'bg-green-500';
        this.strengthText = 'Excellent';
        break;
    }
  }

  // Méthode appelée à la soumission du formulaire
  onSubmit(): void {
    if (this.resetForm.valid) {
    //  console.log('Formulaire valide, envoi des données...', this.resetForm.value);
      // Ici, vous appelleriez votre service pour envoyer la requête HTTP
      // this.authService.resetPassword(this.resetForm.value).subscribe(...);
    } else {
    //  console.log('Formulaire invalide');
      // Marquer tous les champs comme "touchés" pour afficher les erreurs
      this.resetForm.markAllAsTouched();
    }
  }
}
