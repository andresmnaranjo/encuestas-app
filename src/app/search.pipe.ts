import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toUpperCase();
    return items.filter( it => {
      if(it.nombre){
        return (it.nombre.toUpperCase().includes(terms) || it.apellido.toUpperCase().includes(terms));
      }else{
        return (it.descripcion.toUpperCase().includes(terms));

      }
    });
  }

}
