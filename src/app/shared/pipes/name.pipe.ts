import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../../core/models/user';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(value: User): string {
    return value.fullName + ' ' + value.username;
  }

}
