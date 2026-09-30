import { Component, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/contact';

  // ⚠️ À remplacer par VOS vraies informations
  readonly email = 'aflisarra19@gmail.com';
  readonly emailPlaceholder = 'sophie@acme.io';
  readonly phone = '+216 25 091 333';               // affiché tel quel
  readonly phoneHref = 'tel:+21625091333';            // sans espaces
  readonly whatsappUrl = 'https://wa.me/21625091333'; // format international, sans + ni espaces
  readonly availability = 'Disponible dès octobre 2026';
  readonly bookingUrl = 'https://calendly.com/votre-lien'; // ou lien Google Calendar
  readonly linkedinUrl = 'https://www.linkedin.com/in/sarra-afli-403862228/';
  readonly githubUrl = 'https://github.com/aflisarra';

  readonly subjects = [
    { value: 'Opportunité de Recrutement — CDI', label: 'CDI' },
    { value: "Opportunité d'Alternance — Backend / Fullstack", label: 'Alternance' },
    { value: 'Échange rapide de 15 min', label: 'Échange rapide' },
  ];

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    subject: [this.subjects[0].value, [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly copied = signal(false);
  readonly sent = signal(false);
  readonly sending = signal(false);
  readonly error = signal<string | null>(null);

  invalid(control: 'name' | 'email' | 'subject' | 'message'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || c.dirty);
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      /* Presse-papiers indisponible : l'email reste sélectionnable */
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sending.set(true);
    this.sent.set(false);
    this.error.set(null);

    this.http.post<{ message: string }>(this.apiUrl, this.form.getRawValue()).subscribe({
      next: () => {
        this.sending.set(false);
        this.sent.set(true);
        this.form.reset({ subject: this.subjects[0].value });
      },
      error: (err: HttpErrorResponse) => {
        this.sending.set(false);
        this.error.set(err.error?.error ?? "Une erreur est survenue. Réessayez ou écrivez-moi par email.");
      },
    });
  }
}