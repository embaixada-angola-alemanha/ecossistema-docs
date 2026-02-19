import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'eco-loading-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="eco-spinner-container" role="status" aria-live="polite">
      <mat-spinner [diameter]="diameter()"></mat-spinner>
      @if (message()) {
        <p class="eco-spinner-message">{{ message() }}</p>
      }
    </div>
  `,
  styles: [`
    .eco-spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      gap: 1rem;
    }
    .eco-spinner-message {
      color: #666;
      font-size: 0.875rem;
      margin: 0;
    }
  `]
})
export class LoadingSpinnerComponent {
  diameter = input(48);
  message = input('');
}
