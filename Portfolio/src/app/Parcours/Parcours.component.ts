import { Component } from '@angular/core';

type SkillIcon = 'server' | 'database' | 'layers' | 'terminal' | 'brain';

interface SkillItem {
  name: string;
  note?: string;
}

interface SkillGroup {
  icon: SkillIcon;
  title: string;
  description: string;
  items: SkillItem[];
}

@Component({
  selector: 'app-parcours',
  standalone: true,
  templateUrl: './Parcours.component.html',
  styleUrl: './Parcours.component.css',})
export class ParcoursComponent {
  readonly groups: SkillGroup[] = [
    {
      icon: 'server',
      title: 'Backend & Async',
      description: 'APIs RESTful, architectures orientées événements, microservices.',
      items: [
        { name: 'Java / Spring Boot' },
        { name: 'Node.js & Express' },
        { name: 'Python / Flask' },
        { name: 'C# / .NET' },
        { name: 'php / Symfony' },
        { name: 'API REST /JWT' },
      ],
    },
    {
      icon: 'database',
      title: 'Données & Caching',
      description: 'Schémas relationnels, cache en mémoire et modèles temps réel.',
      items: [
        { name: 'MySQL' },
        { name: 'MongoDB' },
        { name: 'H2'  },
        { name: 'Architecture Microservices' },
        { name: 'RabbitMQ' },
        { name: 'Eureka' },
      ],
    },
    {
      icon: 'layers',
      title: 'Frontend & Web',
      description: 'Interfaces web et applications interactives.',
      items: [
        { name: 'Angular' },
        { name: 'JavaScript / TypeScript' },
        { name: 'HTML / CSS' },
        { name: 'Flutter' },
      ],
    },
    {
      icon: 'terminal',
      title: 'DevOps & Méthode',
      description: 'Pipelines de livraison continue, conteneurisation et tests automatisés.',
      items: [
        { name: 'Git' },
        { name: 'Docker', note: '(CI/CD)' },
        { name: 'Jira' },
        { name: 'Agile / Scrum' },
        { name: 'Clean Code' },
        { name: 'Jenkins' },
      ],
    },

    {
      icon: 'brain',
      title: 'Intelligence Artificielle & Tests',
      description: 'Génération et analyse intelligente des tests automatisés.',
      items: [
        { name: 'Machine Learning & Flask'},
        { name: 'OpenAI API' },
        { name: 'Ollama & Qwen 2.5' },
        { name: 'Python & FastAPI' },
        { name: 'Selenium WebDriver' },
        { name: 'Fallbacks & adaptation au DOM' },
        { name: 'Analyse des erreurs par IA' },
      ],
    },
  ];
}