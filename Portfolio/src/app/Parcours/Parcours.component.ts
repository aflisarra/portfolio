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
        { name: 'PHP / Symfony' },
        { name: 'API REST / JWT' },
        { name: 'Architecture Microservices' },
        { name: 'Eureka' },
        { name: 'RabbitMQ' },
        
      ],
    },
{
  icon: 'database',
  title: 'Bases de données',
  description: 'Schémas relationnels, bases NoSQL et stockage en mémoire.',
  items: [
    { name: 'MySQL' },
    { name: 'MongoDB' },
    { name: 'H2' },
  ],
},
{
  icon: 'layers',
  title: 'Frontend & Mobile',
  description: 'Interfaces web, applications mobiles et données en temps réel.',
  items: [
    { name: 'Angular' },
    { name: 'JavaScript / TypeScript' },
    { name: 'HTML / CSS' },
    { name: 'Flutter' },
    { name: 'Firebase', note: '(Flutter)' },
  ],
},
    {
      icon: 'terminal',
      title: 'DevOps & Méthode',
      description: 'Pipelines de livraison continue, conteneurisation et tests automatisés.',
      items: [
        { name: 'Git' },
        { name: 'Docker' },
        { name: 'Jira' },
        { name: 'Agile / Scrum' },
        { name: 'Clean Code' },
        { name: 'Jenkins', note: '(CI/CD)' },
      ],
    },

    {
      icon: 'brain',
      title: 'Intelligence Artificielle & Tests',
      description: 'Génération et analyse intelligente des tests automatisés.',
      items: [
        { name: 'OpenAI API' },
        { name: 'Ollama & Qwen 2.5' },
        { name: 'FastAPI' },
        { name: 'Selenium WebDriver' },
        { name: 'Fallbacks et sélecteurs adaptatifs (DOM)' },
        { name: 'Analyse des erreurs de tests par IA' },
      ],
    },
  ];
}