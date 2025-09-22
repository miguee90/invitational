import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnvelopeComponent } from "./components/envelope/envelope.component";
import { CommonModule } from '@angular/common';

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

  scrollToContent() {
    if (this.contentBelow) {
      this.contentBelow.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
