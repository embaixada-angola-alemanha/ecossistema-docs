import { Pipe, PipeTransform } from '@angular/core';

/**
 * Truncates text to a maximum length with ellipsis.
 * Usage: {{ text | truncate:100 }}
 */
@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, maxLength = 150): string {
    if (!value || value.length <= maxLength) return value ?? '';
    return value.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
  }
}
