import { AfterViewInit, Component, DestroyRef, inject, signal } from '@angular/core';
import { AccueilComponent } from '../app/Accueil/Accueil.component';
import { ContactComponent } from '../app/Contact/Contact.component';
import { ParcoursComponent } from '../app/Parcours/Parcours.component';
import { ProjetsComponent } from '../app/Projets/Projets.component';

interface NavLink {
  id: string;
  label: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccueilComponent, ProjetsComponent, ParcoursComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly year = new Date().getFullYear();

  readonly links: NavLink[] = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'projets', label: 'Projets' },
    { id: 'parcours', label: 'Parcours' },
    { id: 'contact', label: 'Contact' },
  ];

  /** Section actuellement visible (met en surbrillance le lien de la navbar). */
  readonly active = signal('accueil');

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) this.active.set(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    for (const link of this.links) {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    }
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}