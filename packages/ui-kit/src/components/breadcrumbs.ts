import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

export interface BreadcrumbItem {
  label: string;
  routerLink?: string[];
  translate?: boolean;
}

@Component({
  selector: 'eco-breadcrumbs',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  template: `
    <nav class="eco-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        @for (item of items(); track item.label; let last = $last) {
          <li [class.active]="last">
            @if (item.routerLink && !last) {
              <a [routerLink]="item.routerLink">
                {{ item.translate ? (item.label | translate) : item.label }}
              </a>
            } @else {
              <span>{{ item.translate ? (item.label | translate) : item.label }}</span>
            }
            @if (!last) {
              <span class="separator" aria-hidden="true">›</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [`
    .eco-breadcrumbs ol {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.25rem;
      padding: 0;
      margin: 0;
      font-size: 0.875rem;
    }
    .eco-breadcrumbs li { display: flex; align-items: center; gap: 0.25rem; }
    .eco-breadcrumbs a { color: var(--eco-link-color, #1565c0); text-decoration: none; }
    .eco-breadcrumbs a:hover { text-decoration: underline; }
    .eco-breadcrumbs .active span { color: var(--eco-text-muted, #666); }
    .separator { color: var(--eco-text-muted, #999); }
  `]
})
export class BreadcrumbsComponent {
  items = input<BreadcrumbItem[]>([]);
}
