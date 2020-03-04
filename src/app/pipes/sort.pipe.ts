// ng g pipe shared/pipes/sort.pipe.ts
//shared/pipes/sort.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  sortedItems:any[];
  actualItems:any[];

  transform(items: any[], 
           fieldName: string, 
           order: string = 'asc'): any {
    if (!items || !fieldName) {
      return items;
    }

    if(items !== this.actualItems){
      this.actualItems = items;
    }

    if (order === 'asc') {
      return items.sort ( (left, right) => {
            if (left[fieldName] < right[fieldName])
              return -1;

            return 1
      })
    }

    // asc
    return items.sort ( (left, right) => {
      if (left[fieldName] < right[fieldName])
        return 1;

      return -1
    })

  }

}