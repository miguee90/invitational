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
   @ViewChild('audioRef') audioRef!: ElementRef<HTMLAudioElement>;
  isPlaying = false;
  fechaEvento = new Date('2025-12-19T20:00:00'); // Cambia la fecha de tu evento
  dias: number = 0;
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;

  constructor() {
    interval(1000).subscribe(() => this.actualizarContador());
  }

  ngAfterViewInit(): void {
    // Detecta la primera interacción del usuario para permitir la reproducción
    const handleFirstInteraction = () => {
      this.playMusic();
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
  }

  toggleMusic(): void {
    const audio = this.audioRef.nativeElement;

    if (audio.paused) {
      audio.play();
      this.isPlaying = true;
    } else {
      audio.pause();
      this.isPlaying = false;
    }
  }

  private playMusic(): void {
    const audio = this.audioRef.nativeElement;
    audio.play().then(() => {
      this.isPlaying = true;
    }).catch(err => {
      console.warn('El navegador bloqueó la reproducción automática:', err);
    });
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
