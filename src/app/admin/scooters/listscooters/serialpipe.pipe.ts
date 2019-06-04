import { Pipe, PipeTransform } from '@angular/core';
import { Scooter } from 'src/app/model/scooter/scooter';

@Pipe({
  name: 'serialpipe'
})
export class SerialpipePipe implements PipeTransform {

  transform(value: Scooter[], filterBy: string): Scooter[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((product: Scooter) =>
      product.numeroserial.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }

}
