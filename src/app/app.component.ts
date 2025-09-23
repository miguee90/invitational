import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnvelopeComponent } from "./components/envelope/envelope.component";
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule ,EnvelopeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'invitational';

  @ViewChild('contentBelow') contentBelow!: ElementRef<HTMLDivElement>;
  fechaEvento = new Date('2025-12-19T20:00:00'); // Cambia la fecha de tu evento
  dias: number = 0;
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;

  constructor() {
    interval(1000).subscribe(() => this.actualizarContador());
  }

  actualizarContador() {
    const ahora = new Date().getTime();
    const distancia = this.fechaEvento.getTime() - ahora;

    if (distancia > 0) {
      this.dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
      this.horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
      this.segundos = Math.floor((distancia % (1000 * 60)) / 1000);
    } else {
      this.dias = this.horas = this.minutos = this.segundos = 0;
    }
  }

  scrollToContent() {
    if (this.contentBelow) {
      this.contentBelow.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
