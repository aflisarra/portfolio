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
  repoUrl?: string;
  backendRepoUrl?: string;
  frontendRepoUrl?: string;
  media: MediaItem[];
  demoUrl: string;
}

@Component({
  selector: 'app-projets',
  standalone: true,
  templateUrl: './Projets.component.html',
  styleUrl: './Projets.component.css',
})
export class ProjetsComponent {
  readonly featured: Project = {
    badge: 'Projet phare • IA & tests automatisés',
    version: 'PFE 2026',
    title: 'TestFlow – Tests web automatisés avec une IA locale',
    summary:
      "Une plateforme qui lit un cahier des charges, génère les cas de test, les exécute avec Selenium et explique pourquoi un test échoue.",
    description: `
      <ul>
        <li>Plateforme web qui <strong>génère, organise et exécute des scénarios de test</strong> à partir d’une spécification (.docx).</li>
        <li>Pipeline en trois phases : extraction du texte de la spécification, génération d’un <strong>plan de test (JSON) validé par le testeur</strong>, puis production des cas de test avec leurs étapes et leurs données.</li>
        <li>Pendant l’exécution, l’IA choisit chaque action à partir de l’étape courante et du <strong>DOM</strong> de la page. Un <strong>moteur d’interprétation</strong> la transforme en action Selenium, avec des <strong>fallbacks</strong> quand un sélecteur ne répond plus.</li>
        <li>En cas d’échec, l’IA analyse les logs, le DOM final et l’étape fautive pour proposer une <strong>cause probable et un correctif</strong> dans un rapport.</li>
        <li>Modèle <strong>Qwen 2.5 servi en local avec Ollama</strong> : les données restent en interne et il n’y a aucun coût d’API. Je travaille sur le compromis entre qualité et temps de réponse, notamment grâce à une extraction ciblée du texte de la spécification.</li>
        <li><strong>Traçabilité</strong> complète : logs, résultats et capture d’écran à chaque étape.</li>
        <li>Stack : <strong>Angular, Node.js / Express, FastAPI et MongoDB</strong>, le tout conteneurisé avec <strong>Docker</strong>.</li>
      </ul>
    `,
    metrics: [
      { label: 'IA', value: 'Ollama • Qwen 2.5' },
      { label: 'Automatisation', value: 'Selenium' },
      { label: 'Traçabilité', value: 'Logs & captures' },
    ],
    tags: [
      'Angular',
      'Node.js',
      'Express',
      'FastAPI',
      'Python',
      'MongoDB',
      'Selenium',
      'Ollama',
      'Qwen 2.5',
      'Docker',
    ],
    status: 'IA locale • Selenium • Fallbacks • Analyse des échecs',
    repoUrl: 'https://github.com/aflisarra/testFlow/tree/feature/dashboard-change-password',
    media: [
      // Fichiers dans public/projets/testflow/
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
    title: 'SmartMeet – Plateforme collaborative de gestion d’événements',
    summary:
      "Application pour créer et suivre des événements en présentiel ou en ligne, avec lives, stories, analyse des émotions et chatbot.",
    description: `
      <ul>
        <li>Application web collaborative en <strong>Spring Boot et Angular</strong> pour créer et gérer des événements, <strong>en présentiel ou en ligne</strong>.</li>
        <li>Les participants peuvent suivre un événement <strong>en direct (Live)</strong> et partager des <strong>stories</strong> pour échanger entre eux.</li>
        <li>Espace de <strong>publications et de commentaires</strong> avec <strong>analyse des émotions</strong> (modèle de Machine Learning entraîné sur un dataset, exposé par une <strong>API Flask</strong>) et détection automatique des <strong>mots inappropriés</strong>.</li>
        <li><strong>Chatbot</strong> basé sur une <strong>API d’IA</strong> pour guider les utilisateurs autour des événements.</li>
        <li>Module de <strong>sponsoring</strong> pour mettre des événements en avant et gérer les contenus sponsorisés.</li>
      </ul>
    `,
    metrics: [
      { label: 'Backend', value: 'Spring Boot' },
      { label: 'Frontend', value: 'Angular' },
      { label: 'IA', value: 'Émotions & chatbot' },
    ],
    // TODO : ajouter la base de données utilisée (MySQL ? MongoDB ?)
    tags: ['Spring Boot', 'Angular', 'Flask', 'Machine Learning', 'API d’IA', 'Live', 'Sponsoring'],
    status: 'Événements • Live • Stories • Sponsoring',
    backendRepoUrl: 'https://github.com/aflisarra/smartmeet-back',
    frontendRepoUrl: 'https://github.com/aflisarra/smartmeet_front',
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
      'Plateforme web pour suivre les stages : candidatures, notifications par e-mail et réclamations.',
    description: `
      <ul>
        <li>Plateforme web en <strong>Symfony et MySQL</strong> qui centralise la gestion des stages et les échanges entre les utilisateurs.</li>
        <li>Gestion des <strong>stages, des candidatures et des utilisateurs</strong>, avec des fonctionnalités propres à chaque rôle.</li>
        <li><strong>Notifications et e-mails automatiques via SMTP</strong> à chaque étape importante du parcours d’un stage.</li>
        <li>Système de <strong>réclamations</strong> : l’utilisateur soumet sa demande et suit son traitement.</li>
        <li>Gestion des <strong>profils</strong> pour regrouper les informations liées aux stages.</li>
      </ul>
    `,
    metrics: [
      { label: 'Backend', value: 'Symfony' },
      { label: 'Base de données', value: 'MySQL' },
      { label: 'Notifications', value: 'SMTP' },
    ],
    tags: ['Symfony', 'PHP', 'MySQL', 'SMTP'],
    status: 'Stages • Candidatures • Réclamations',
    repoUrl: 'https://github.com/aflisarra/Gestion-des-stages', // TODO : lien réel du dépôt
    media: [
      // Fichiers dans public/projets/symphony/
      { type: 'video', src: 'projets/symphony/demo.mp4' },
    ],
    demoUrl: '#',
  };

  readonly restaurant: Project = {
    badge: 'Projet • Architecture microservices',
    version: 'Projet académique',
    title: 'GastroFlow – Gestion de restaurant en microservices',
    summary:
      'Application de gestion de restaurant découpée en services : commandes, stock, réservations et facturation.',
    description: `
      <ul>
        <li>Application construite en <strong>architecture microservices</strong> : un service commun en <strong>Node.js / Express</strong> et plusieurs services métier en <strong>Spring Boot</strong>.</li>
        <li>Quatre services métier : <strong>commandes, stockage, réservation et facturation</strong>.</li>
        <li>Les services communiquent entre eux avec <strong>RabbitMQ</strong>, et <strong>Eureka</strong> gère leur enregistrement et leur découverte.</li>
        <li>Interfaces développées en <strong>Angular</strong> pour les différents services.</li>
        <li><strong>H2</strong> pour les tests, <strong>MySQL</strong> en production.</li>
        <li>Ensemble de l’application conteneurisé avec <strong>Docker</strong>.</li>
      </ul>
    `,
    metrics: [
      { label: 'Architecture', value: 'Microservices' },
      { label: 'Communication', value: 'RabbitMQ' },
      { label: 'Découverte', value: 'Eureka' },
    ],
    tags: [
      'Spring Boot',
      'Node.js',
      'Express',
      'Angular',
      'RabbitMQ',
      'Eureka',
      'Docker',
      'MySQL',
      'H2',
    ],
    status: 'Microservices • RabbitMQ • Eureka • Docker',
    repoUrl: 'https://github.com/medrezgui/FoodJoy', // TODO : lien réel du dépôt
    media: [
      // Fichiers dans public/projets/resto/
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
  readonly expandedTags = signal<Record<string, boolean>>({});

  isOpen(key: string): boolean {
    return !!this.expanded()[key];
  }

  toggle(key: string): void {
    this.expanded.update((s) => ({ ...s, [key]: !s[key] }));
  }

  showAllTags(key: string): boolean {
    return !!this.expandedTags()[key];
  }

  toggleTags(key: string): void {
    this.expandedTags.update((s) => ({ ...s, [key]: !s[key] }));
  }

  get projects(): Project[] {
    return [this.featured, this.featured2, this.symphony, this.restaurant];
  }
}
