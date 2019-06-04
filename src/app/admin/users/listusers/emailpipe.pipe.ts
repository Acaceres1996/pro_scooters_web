import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/model/user/user';

@Pipe({
  name: 'emailpipe'
})
export class EmailpipePipe implements PipeTransform {

  transform(value: User[], filterBy: string): User[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((product: User) =>
      product.email.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }

}
