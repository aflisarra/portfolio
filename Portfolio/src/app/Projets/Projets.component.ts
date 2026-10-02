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
  templateUrl: './Projets.component.html',
  styleUrl: './Projets.component.css',
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
