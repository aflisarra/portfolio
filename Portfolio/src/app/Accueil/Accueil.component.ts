import { Component } from '@angular/core';

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './Accueil.component.html',
  styleUrl: './Accueil.component.css',
})
export class AccueilComponent {
  readonly cvUrl = '/assets/cvsarraafli (2).pdf';
  readonly photoUrl = '/assets/photo.jpg';
  photoError = false;

  readonly stats: Stat[] = [
   
  ];
}