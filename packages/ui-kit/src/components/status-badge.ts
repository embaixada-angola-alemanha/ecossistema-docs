import { Component, computed, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

type BadgeColor = 'grey' | 'blue' | 'green' | 'red' | 'orange' | 'purple';

const STATUS_COLORS: Record<string, BadgeColor> = {
  // Common states
  'DRAFT': 'grey', 'RASCUNHO': 'grey', 'BACKLOG': 'grey',
  'PENDING': 'orange', 'PENDENTE': 'orange', 'TODO': 'orange', 'PLANNING': 'orange',
  'IN_PROGRESS': 'blue', 'EM_ANALISE': 'blue', 'IN_REVIEW': 'blue', 'SUBMITTED': 'blue',
  'ACTIVE': 'blue', 'ACTIVO': 'blue',
  'APPROVED': 'green', 'APROVADO': 'green', 'PUBLISHED': 'green', 'PUBLICADO': 'green',
  'DONE': 'green', 'COMPLETED': 'green', 'CONCLUIDA': 'green', 'RESOLVED': 'green',
  'CERTIFICADO_EMITIDO': 'green', 'ENTREGUE': 'green',
  'REJECTED': 'red', 'REJEITADO': 'red', 'BLOCKED': 'red', 'CANCELLED': 'red', 'CANCELADO': 'red',
  'MISSED': 'red',
  'ARCHIVED': 'purple', 'ARQUIVADO': 'purple',
  'REVIEW': 'blue', 'OPEN': 'orange'
};

@Component({
  selector: 'eco-status-badge',
  standalone: true,
  imports: [MatChipsModule],
  template: `
    <mat-chip-option [class]="'eco-badge eco-badge--' + color()" [selectable]="false" [disabled]="true">
      {{ label() }}
    </mat-chip-option>
  `,
  styles: [`
    :host { display: inline-block; }
    .eco-badge { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.025em; min-height: 24px; }
    .eco-badge--grey { --mdc-chip-elevated-container-color: #e0e0e0; --mdc-chip-label-text-color: #616161; }
    .eco-badge--blue { --mdc-chip-elevated-container-color: #bbdefb; --mdc-chip-label-text-color: #1565c0; }
    .eco-badge--green { --mdc-chip-elevated-container-color: #c8e6c9; --mdc-chip-label-text-color: #2e7d32; }
    .eco-badge--red { --mdc-chip-elevated-container-color: #ffcdd2; --mdc-chip-label-text-color: #c62828; }
    .eco-badge--orange { --mdc-chip-elevated-container-color: #ffe0b2; --mdc-chip-label-text-color: #e65100; }
    .eco-badge--purple { --mdc-chip-elevated-container-color: #e1bee7; --mdc-chip-label-text-color: #6a1b9a; }
  `]
})
export class StatusBadgeComponent {
  status = input.required<string>();
  label = input('');

  color = computed<BadgeColor>(() => {
    const key = this.status().toUpperCase().replace(/\s+/g, '_');
    return STATUS_COLORS[key] ?? 'grey';
  });
}
