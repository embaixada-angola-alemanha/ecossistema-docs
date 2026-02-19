import { Component, input, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

export interface WorkflowStep {
  key: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'eco-workflow-stepper',
  standalone: true,
  imports: [MatIconModule, TranslateModule],
  template: `
    <div class="eco-stepper">
      @for (step of steps(); track step.key; let i = $index; let last = $last) {
        <div class="eco-step" [class]="stepClass(i)">
          <div class="eco-step-indicator">
            @if (i < activeIndex()) {
              <mat-icon class="eco-step-icon done">check_circle</mat-icon>
            } @else if (i === activeIndex()) {
              <mat-icon class="eco-step-icon active">{{ isTerminal() ? 'cancel' : 'radio_button_checked' }}</mat-icon>
            } @else {
              <mat-icon class="eco-step-icon pending">radio_button_unchecked</mat-icon>
            }
          </div>
          <span class="eco-step-label">
            {{ translationPrefix() ? (translationPrefix() + '.' + step.key | translate) : step.label }}
          </span>
          @if (!last) {
            <div class="eco-step-connector" [class.completed]="i < activeIndex()"></div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .eco-stepper { display: flex; align-items: flex-start; gap: 0; }
    .eco-step { display: flex; flex-direction: column; align-items: center; position: relative; flex: 1; }
    .eco-step-indicator { z-index: 1; background: var(--eco-bg, #fff); }
    .eco-step-icon { font-size: 1.5rem; width: 1.5rem; height: 1.5rem; }
    .eco-step-icon.done { color: #2e7d32; }
    .eco-step-icon.active { color: #1565c0; }
    .eco-step-icon.pending { color: #bdbdbd; }
    .eco-step-label { font-size: 0.75rem; margin-top: 0.25rem; text-align: center; color: var(--eco-text-muted, #666); }
    .eco-step.completed .eco-step-label { color: #2e7d32; }
    .eco-step.active .eco-step-label { color: #1565c0; font-weight: 600; }
    .eco-step.terminal .eco-step-icon.active { color: #c62828; }
    .eco-step.terminal .eco-step-label { color: #c62828; }
    .eco-step-connector {
      position: absolute;
      top: 0.75rem;
      left: calc(50% + 0.75rem);
      right: calc(-50% + 0.75rem);
      height: 2px;
      background: #e0e0e0;
    }
    .eco-step-connector.completed { background: #2e7d32; }
  `]
})
export class WorkflowStepperComponent {
  steps = input<WorkflowStep[]>([]);
  currentStatus = input('');
  translationPrefix = input('');
  isTerminal = input(false);

  activeIndex = computed(() => {
    const status = this.currentStatus();
    const idx = this.steps().findIndex(s => s.key === status);
    return idx >= 0 ? idx : 0;
  });

  stepClass(index: number): string {
    const active = this.activeIndex();
    if (index < active) return 'completed';
    if (index === active) return this.isTerminal() ? 'active terminal' : 'active';
    return 'pending';
  }
}
