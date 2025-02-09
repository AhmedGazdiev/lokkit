import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText',
})
export class CutTextPipe implements PipeTransform {
  transform(value: string, max: number = 100): string {
    if (value.length > max) {
      return value.substring(0, max) + '...';
    }
    return value;
  }
}
