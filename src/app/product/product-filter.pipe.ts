import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: Product[], text: string): Product[] {
    text = text ? text.toLocaleLowerCase() : text;

    return text ? value.filter(
      (p: Product) => p.name.toLocaleLowerCase().indexOf(text) !== -1
    ) : value;
  }

}
