import { Pipe, PipeTransform } from '@angular/core';

/**
 * Converts decimal hours to "Xh Ym" format.
 * Example: 2.5 → "2h 30m", 0.25 → "0h 15m"
 */
@Pipe({ name: 'hours', standalone: true })
export class HoursPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) return '0h';
    const h = Math.floor(value);
    const m = Math.round((value - h) * 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
}
