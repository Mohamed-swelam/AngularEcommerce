import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit',
})
export class LimitPipe implements PipeTransform {
  transform(value: string, limit: number = 3): string {
    if (!value)
      return '';

    return value
      .split(' ')
      .slice(0, limit)
      .join(' ');
  }
}
