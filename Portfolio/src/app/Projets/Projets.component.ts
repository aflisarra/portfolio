import { Component, HostListener, signal } from '@angular/core';

interface Metric {
  label: string;
  value: string;
}

interface MediaItem {
  type: 'image' | 'video';
  src: string;
}

interface Project {
  badge: string;
  version: string;
  title: string;
  summary: string;
  description: string;
  metrics: Metric[];
  tags: string[];
  status: string;
  repoUrl: string;
  media: MediaItem[];
  demoUrl: string;
}

@Component({
  selector: 'app-projets',
  standalone: true,
  template: `
<section id="projets" class="section">
  <div class="container">
    <header class="head">
      <div>
        <h2 class="section-title">Projets Récents &amp; Réalisations Techniques</h2>
        <p class="section-desc">
          Conçus selon les standards de l'ingénierie logicielle : typage rigoureux,
          observabilité, latence minimale et isolation des responsabilités.
        </p>
      </div>
      <a class="btn" href="#contact">
        Discuter d'un projet
        <svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </header>

    <div class="grid">
      @for (project of projects; track project.title) {
      <article class="card project" [class.is-open]="isOpen(project.title)">

        <!-- Vue compacte -->
        <div class="project__row">
          <div class="project__content">
            <div class="project__top">
              <div class="project__badges">
                <span class="badge">{{ project.badge }}</span>
                <span class="version">{{ project.version }}</span>
              </div>
              <div class="project__links">
                <a class="icon-btn" [href]="project.repoUrl" target="_blank" rel="noopener" aria-label="Code source">
                  <svg class="icon" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h6v6"/><path d="m9 15 6-6"/></svg>
                </a>
                <a class="icon-btn is-active" [href]="project.demoUrl" aria-label="Voir la démo">
                  <svg class="icon" viewBox="0 0 24 24"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                </a>
              </div>
            </div>

            <h3 class="project__title">{{ project.title }}</h3>
            <p class="project__summary">{{ project.summary }}</p>

            <div class="tags">
              @for (t of project.tags.slice(0, 6); track t) { <span class="tag">{{ t }}</span> }
              @if (project.tags.length > 6) { <span class="tag tag--more">+{{ project.tags.length - 6 }}</span> }
            </div>

            <button type="button" class="more" (click)="toggle(project.title)"
                    [attr.aria-expanded]="isOpen(project.title)">
              {{ isOpen(project.title) ? 'Masquer les détails' : 'Plus de détails' }}
              <svg class="icon more__chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </div>

          <div class="mosaic" [class]="'mosaic mosaic--' + (project.media.length > 3 ? 3 : project.media.length)" aria-label="Aperçu du projet">
            @for (m of project.media.slice(0, 3); track m.src; let i = $index) {
              <button type="button" class="mosaic__tile" (click)="open(project, i)" [attr.aria-label]="'Ouvrir le média ' + (i + 1)">
                @if (m.type === 'video') {
                  <video [src]="m.src" preload="metadata" muted playsinline></video>
                  <span class="mosaic__play" aria-hidden="true">▶</span>
                } @else {
                  <img [src]="m.src" alt="" loading="lazy" />
                }
                @if (i === 2 && project.media.length > 3) {
                  <span class="mosaic__more">+{{ project.media.length - 3 }}</span>
                }
              </button>
            }
          </div>
        </div>

        <!-- Détails (dépliables) -->
        <div class="details" [class.open]="isOpen(project.title)">
          <div class="details__inner">
            <div class="details__body">
              <div class="desc" [innerHTML]="project.description"></div>

              <dl class="metrics">
                @for (m of project.metrics; track m.label) {
                  <div>
                    <dt>{{ m.label }}</dt>
                    <dd>{{ m.value }}</dd>
                  </div>
                }
              </dl>

              <footer class="project__foot">
                <span class="status"><span class="dot"></span> {{ project.status }}</span>
              </footer>
            </div>
          </div>
        </div>
      </article>
      }
    </div>
  </div>
</section>

<!-- Visionneuse -->
@if (lightbox(); as lb) {
  <div class="modal" role="dialog" aria-modal="true" (click)="close()">
    <button type="button" class="modal__close" (click)="close()" aria-label="Fermer">✕</button>
    @if (lb.project.media.length > 1) {
      <button type="button" class="modal__nav modal__nav--prev" (click)="step(-1); $event.stopPropagation()" aria-label="Précédent">‹</button>
      <button type="button" class="modal__nav modal__nav--next" (click)="step(1); $event.stopPropagation()" aria-label="Suivant">›</button>
    }
    <div class="modal__body" (click)="$event.stopPropagation()">
      @let m = lb.project.media[lb.index];
      @if (m.type === 'video') {
        <video [src]="m.src" controls autoplay playsinline></video>
      } @else {
        <img [src]="m.src" [alt]="'Capture de ' + lb.project.title" />
      }
      <span class="modal__count">{{ lb.index + 1 }} / {{ lb.project.media.length }}</span>
    </div>
  </div>
}
`,
  styles: [`
:host { display: block; }

.head {
  display: flex; justify-content: space-between; align-items: flex-end;
  gap: 24px; flex-wrap: wrap; margin-bottom: 36px;
}
.grid { display: flex; flex-direction: column; gap: 16px; }

/* ---------- Carte compacte ---------- */
.project { padding: 20px; transition: border-color .2s; }
.project:hover, .project.is-open { border-color: var(--border-strong); }

.project__row { display: flex; align-items: stretch; gap: 24px; }
.project__content { display: flex; flex-direction: column; gap: 12px; flex: 1 1 0; min-width: 0; }

.project__top { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.project__badges { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.project__links { display: flex; gap: 8px; }
.version { font: 400 10.5px/1 var(--font-mono); color: var(--text-dim); }

.project__title { font-size: 18px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.3; }
.project__summary {
  font-size: 13px; line-height: 1.55; color: var(--text-muted); max-width: 560px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

/* Bouton « Plus de détails » */
.more {
  display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; margin-top: auto;
  padding: 8px 14px; border-radius: 8px; cursor: pointer;
  font-size: 12.5px; font-weight: 500; color: var(--accent);
  background: transparent; border: 1px solid var(--border-strong);
  transition: border-color .15s, background .15s;
}
.more:hover { border-color: var(--accent); background: var(--surface-2); }
.more__chev { width: 14px; height: 14px; transition: transform .25s; }
.is-open .more__chev { transform: rotate(180deg); }

.tag--more { color: var(--text-dim); }

/* ---------- Détails dépliables ---------- */
.details {
  display: grid; grid-template-rows: 0fr;
  transition: grid-template-rows .3s ease;
}
.details.open { grid-template-rows: 1fr; }
.details__inner { overflow: hidden; min-height: 0; }
.details__body {
  margin-top: 18px; padding-top: 18px; border-top: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 16px;
}
.desc { font-size: 13px; line-height: 1.6; color: var(--text-muted); }
.desc ul { padding-left: 18px; display: flex; flex-direction: column; gap: 8px; margin: 0; }
.desc strong { color: var(--text); font-weight: 600; }

.metrics {
  display: grid; grid-template-columns: repeat(3, auto); justify-content: start; gap: 40px;
  padding: 12px 18px; border-radius: 10px; margin: 0;
  background: #0e0e11; border: 1px solid var(--border);
}
.metrics dt { font-size: 10.5px; color: var(--text-dim); }
.metrics dd { font: 600 13px/1.6 var(--font-mono); color: var(--accent); margin: 0; }

.project__foot { font-size: 10.5px; color: var(--text-dim); }
.status { display: inline-flex; align-items: center; gap: 8px; }

/* ---------- Mosaïque réduite ---------- */
.mosaic {
  flex: 0 0 34%; min-width: 0; height: 190px; align-self: center;
  display: grid; gap: 6px;
  grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
}
.mosaic--1 { grid-template-columns: 1fr; grid-template-rows: 1fr; }
.mosaic--2 { grid-template-rows: 1fr; }
.mosaic--3 .mosaic__tile:first-child, .mosaic--2 .mosaic__tile:first-child { grid-row: 1 / -1; }
.mosaic__tile {
  position: relative; padding: 0; overflow: hidden; cursor: pointer; min-height: 0;
  border-radius: 8px; border: 1px solid var(--border); background: #0e0e11;
  transition: border-color .15s, transform .15s;
}
.mosaic__tile:hover { border-color: var(--accent); transform: scale(1.02); }
.mosaic__tile img, .mosaic__tile video { width: 100%; height: 100%; object-fit: cover; display: block; pointer-events: none; }
.mosaic__play { position: absolute; inset: 0; display: grid; place-items: center; color: #fff; font-size: 18px; background: rgba(0,0,0,.25); }
.mosaic__more {
  position: absolute; right: 8px; bottom: 8px; width: 36px; height: 36px; border-radius: 50%;
  display: grid; place-items: center; background: rgba(14,14,17,.85); border: 1px solid var(--text-dim);
  color: var(--text); font: 600 12px/1 var(--font-mono);
}

/* ---------- Visionneuse ---------- */
.modal {
  position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center;
  background: rgba(0,0,0,.88); padding: 56px 72px;
}
.modal__body { position: relative; max-width: 100%; max-height: 100%; display: grid; place-items: center; }
.modal__body img, .modal__body video { max-width: 100%; max-height: calc(100vh - 112px); border-radius: 10px; display: block; }
.modal__close, .modal__nav {
  position: absolute; border-radius: 50%; border: 1px solid var(--border);
  background: rgba(14,14,17,.85); color: var(--text); cursor: pointer; line-height: 1;
}
.modal__close:hover, .modal__nav:hover { border-color: var(--accent); color: var(--accent); }
.modal__close { top: 16px; right: 16px; width: 38px; height: 38px; font-size: 16px; }
.modal__nav { top: 50%; transform: translateY(-50%); width: 46px; height: 46px; font-size: 26px; }
.modal__nav--prev { left: 16px; }
.modal__nav--next { right: 16px; }
.modal__count { position: absolute; bottom: -30px; left: 50%; transform: translateX(-50%); font: 400 11px/1 var(--font-mono); color: var(--text-muted); }

/* ---------- Responsive ---------- */
@media (max-width: 960px) {
  .project__row { flex-direction: column-reverse; gap: 16px; }
  .mosaic { flex: none; width: 100%; height: 170px; }
  .metrics { gap: 24px; }
  .modal { padding: 56px 12px; }
  .modal__nav { width: 38px; height: 38px; }
}
@media (max-width: 520px) {
  .metrics { grid-template-columns: 1fr 1fr; }
}
`],
})
export class ProjetsComponent {
  readonly featured: Project = {
    badge: 'Projet phare • IA & Automatisation des tests',
    version: 'PFE 2026',
    title: 'TestFlow – Plateforme intelligente de tests automatisés avec IA générative',
    summary:
      "Plateforme qui génère, exécute et analyse automatiquement des tests web (Selenium) grâce à l'IA générative.",
    description: `
      <ul>
        <li>Plateforme web intelligente permettant de <strong>générer, organiser et exécuter automatiquement des scénarios de test</strong> à partir de spécifications.</li>
        <li>Intégration d’une <strong>IA générative</strong> pour analyser les spécifications et générer des plans, scénarios et cas de test structurés.</li>
        <li>Automatisation des tests web avec <strong>Selenium</strong>, basée sur des actions générées dynamiquement à partir du DOM de l’application.</li>
        <li>Mise en place d’un <strong>moteur d’interprétation des actions</strong> permettant de traduire les décisions de l’IA en interactions Selenium exécutables, avec des mécanismes de <strong>fallback</strong> en cas d’échec.</li>
        <li>Analyse par IA des <strong>échecs d’exécution</strong> afin d’identifier les causes des problèmes et de proposer des actions correctives.</li>
        <li>Mise en place d’un système de <strong>traçabilité</strong> avec enregistrement des logs, des résultats d’exécution et des <strong>captures d’écran à chaque étape</strong>.</li>
        <li>Développement Full Stack avec <strong>Angular, Node.js/Express, Python/FastAPI et MongoDB</strong>, avec intégration d’un moteur d’IA.</li>
        <li><strong>Conteneurisation et orchestration</strong> de l’ensemble de la plateforme avec <strong>Docker</strong>.</li>
      </ul>
    `,
    metrics: [
      { label: 'IA', value: 'Générative' },
      { label: 'Automatisation', value: 'Selenium' },
      { label: 'Traçabilité', value: 'Logs & captures' },
    ],
    tags: [
      'Angular',
      'Node.js',
      'Express',
      'Python',
      'FastAPI',
      'Selenium',
      'MongoDB',
      'Docker',
      'IA générative',
    ],
    status: 'IA • Selenium • Fallbacks • Analyse des échecs',
    repoUrl: 'https://github.com/aflisarra/testFlow',
    media: [
      // Fichiers dans public/projets/testflow/
      { type: 'video', src: 'projets/testflow/merged-video-cut.mp4' },
      { type: 'image', src: 'projets/testflow/analyse.png' },
      { type: 'image', src: 'projets/testflow/dashboard.png' },
      { type: 'image', src: 'projets/testflow/interfaceuser (1).png' },
      { type: 'image', src: 'projets/testflow/rapporttest.png' },
    ],
    demoUrl: '#',
  };

  readonly featured2: Project = {
    badge: 'Projet • Gestion d’événements',
    version: 'Projet académique 2025',
    title: 'SmartMeet – Plateforme intelligente de gestion de réunions',
    summary:
      "Application collaborative de gestion d'événements (présentiel, live, stories) avec analyse des émotions et chatbot.",
    description: `
      <ul>
        <li>Application web collaborative développée avec <strong>Spring Boot et Angular</strong>, permettant de créer et gérer des événements <strong>en présentiel ou en ligne</strong>.</li>
        <li>Organisation d’événements avec possibilité de suivre les événements <strong>en direct (Live)</strong> et de partager des <strong>stories</strong> pour favoriser les interactions entre participants.</li>
        <li>Mise en place d’un espace de <strong>publication et de commentaires</strong>, enrichi par l’<strong>analyse des émotions</strong> et la détection automatique des <strong>mots inappropriés</strong> dans les contenus.</li>
        <li>Intégration d’un <strong>chatbot intelligent</strong> pour améliorer l’expérience utilisateur et faciliter les interactions autour des événements.</li>
        <li>Ajout d’un module de <strong>sponsoring</strong> permettant de mettre en avant des événements et de gérer les contenus sponsorisés.</li>
      </ul>
    `,
    metrics: [
      { label: 'Backend', value: 'Spring Boot' },
      { label: 'Frontend', value: 'Angular' },
      { label: 'IA', value: 'Émotions & chatbot' },
    ],
    // ⚠️ Ajoutez ici les autres technologies que vous avez vraiment utilisées (base de données, etc.)
    tags: ['Angular', 'Spring Boot', 'Chatbot', 'Analyse des émotions', 'Live', 'Sponsoring'],
    status: 'Événements • Live • Stories • Sponsoring',
    repoUrl: 'https://github.com/', // ⚠️ à remplacer par le vrai lien de SmartMeet
    media: [
      // Fichiers dans public/projets/smartmeet/
      { type: 'video', src: 'projets/smartmeet/demo.mp4' },
      { type: 'image', src: 'projets/smartmeet/login (1).png' },
      { type: 'image', src: 'projets/smartmeet/DetailsEvent.png' },
      { type: 'image', src: 'projets/smartmeet/CHATboatOffre.png' },
      { type: 'image', src: 'projets/smartmeet/AiRecmoendationKbir.png' },
    ],
    demoUrl: '#',
  };

  readonly symphony: Project = {
    badge: 'Projet • Gestion des stages',
    version: 'Projet académique',
    title: 'Symphony – Plateforme de gestion des stages',
    summary:
      'Plateforme web de gestion des stages : candidatures, notifications par e-mail et réclamations.',
    description: `
      <ul>
        <li>Plateforme web développée avec <strong>Symfony et MySQL</strong> pour gérer les stages et faciliter les échanges entre les différents utilisateurs.</li>
        <li>Gestion des <strong>stages, candidatures et utilisateurs</strong>, avec des fonctionnalités adaptées aux différents rôles de la plateforme.</li>
        <li>Automatisation des <strong>notifications et de l’envoi d’e-mails via SMTP</strong> pour informer les utilisateurs des différentes étapes liées à leurs stages.</li>
        <li>Mise en place d’un système de <strong>réclamations</strong> permettant aux utilisateurs de soumettre et de suivre leurs demandes.</li>
        <li>Gestion des <strong>profils et des informations des utilisateurs</strong> afin de centraliser les données liées aux stages.</li>
      </ul>
    `,
    metrics: [
      { label: 'Backend', value: 'Symfony' },
      { label: 'Base de données', value: 'MySQL' },
      { label: 'Notifications', value: 'SMTP' },
    ],
    tags: ['Symfony', 'PHP', 'MySQL', 'SMTP'],
    status: 'Gestion des stages • Candidatures • Réclamations',
    repoUrl: 'https://github.com/',
    media: [
      // Fichiers dans public/projets/symphony/
      { type: 'video', src: 'projets/symphony/demo.mp4' },
    ],
    demoUrl: '#',
  };

  readonly restaurant: Project = {
    badge: 'Projet • Architecture Microservices',
    version: 'Projet académique',
    title: 'Application de gestion de restaurant',
    summary:
      'Application de gestion de restaurant en microservices : commandes, stock, réservations et facturation.',
    description: `
      <ul>
        <li>Mise en place d’une architecture <strong>microservices</strong> avec un <strong>service commun développé avec Node.js et Angular</strong>, ainsi que plusieurs services métier développés avec <strong>Spring Boot et Angular</strong>.</li>
        <li>Développement de plusieurs services métier : <strong>service de commandes, service de stockage, service de réservation et service de facturation</strong>.</li>
        <li>Communication inter-services via <strong>RabbitMQ</strong> et conteneurisation de l’application avec <strong>Docker Desktop</strong>.</li>
        <li>Utilisation de <strong>Eureka</strong> pour la découverte et l’enregistrement des différents services.</li>
        <li>Développement des interfaces frontend avec <strong>Angular</strong> pour les différents services de l’application.</li>
        <li>Utilisation de <strong>H2</strong> pour les tests et de <strong>MySQL</strong> pour l’environnement de production.</li>
      </ul>
    `,
    metrics: [
      { label: 'Architecture', value: 'Microservices' },
      { label: 'Communication', value: 'RabbitMQ' },
      { label: 'Découverte', value: 'Eureka' },
    ],
    tags: ['Angular', 'Node.js', 'Spring Boot', 'RabbitMQ', 'Eureka', 'Docker', 'H2', 'MySQL'],
    status: 'Microservices • RabbitMQ • Eureka • Docker',
    repoUrl: 'https://github.com/',
    media: [
      // Fichiers dans public/projets/resto/ (vérifiez que les noms existent exactement)
      { type: 'image', src: 'projets/resto/gastroflow-capture.png' },
      { type: 'image', src: 'projets/resto/gastroflow-app-1.png' },
      { type: 'image', src: 'projets/resto/gastroflow-app-2.1.png' },
      { type: 'image', src: 'projets/resto/gastroflow-app-2.2.png' },
      { type: 'image', src: 'projets/resto/gastroflow-app-4.png' },
    ],
    demoUrl: '#',
  };

  /* ---------- Visionneuse ---------- */
  readonly lightbox = signal<{ project: Project; index: number } | null>(null);

  open(project: Project, index: number): void {
    this.lightbox.set({ project, index });
  }

  close(): void {
    this.lightbox.set(null);
  }

  step(delta: number): void {
    const lb = this.lightbox();
    if (!lb) return;
    const n = lb.project.media.length;
    this.lightbox.set({ project: lb.project, index: (lb.index + delta + n) % n });
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (!this.lightbox()) return;
    if (e.key === 'Escape') this.close();
    else if (e.key === 'ArrowRight') this.step(1);
    else if (e.key === 'ArrowLeft') this.step(-1);
  }

  /* ---------- Détails dépliables ---------- */
  readonly expanded = signal<Record<string, boolean>>({});

  isOpen(key: string): boolean {
    return !!this.expanded()[key];
  }

  toggle(key: string): void {
    this.expanded.update((s) => ({ ...s, [key]: !s[key] }));
  }

  get projects(): Project[] {
    return [this.featured, this.featured2, this.symphony, this.restaurant];
  }
}