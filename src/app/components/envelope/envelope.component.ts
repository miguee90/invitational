import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [],
  templateUrl: './envelope.component.html',
  styleUrl: './envelope.component.css'
})
export class EnvelopeComponent {

  @Output() envelopeClick = new EventEmitter<void>();

  onClickEnvelope() {
    this.envelopeClick.emit(); // 🚀 Avisamos al padre que se hizo clic
  }


}
