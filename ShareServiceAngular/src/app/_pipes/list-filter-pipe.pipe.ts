import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilterPipe'
})
export class ListFilterPipePipe implements PipeTransform {

  transform(list: any[], filterText: string): any {
    return list ? list.filter(item => item.competence.search(new RegExp(filterText, 'i')) > -1) : [];
  }

}
