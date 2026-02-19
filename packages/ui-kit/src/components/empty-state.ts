import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'eco-empty-state',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="eco-empty-state">
      <mat-icon class="eco-empty-icon">{{ icon() }}</mat-icon>
      <h3>{{ title() }}</h3>
      @if (message()) {
        <p>{{ message() }}</p>
      }
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .eco-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1.5rem;
      text-align: center;
      color: var(--eco-text-muted, #999);
    }
    .eco-empty-icon { font-size: 3rem; width: 3rem; height: 3rem; margin-bottom: 1rem; opacity: 0.5; }
    h3 { margin: 0 0 0.5rem; font-size: 1.125rem; color: var(--eco-text-primary, #333); }
    p { margin: 0; font-size: 0.875rem; max-width: 360px; }
  `]
})
export class EmptyStateComponent {
  icon = input('inbox');
  title = input('');
  message = input('');
}
