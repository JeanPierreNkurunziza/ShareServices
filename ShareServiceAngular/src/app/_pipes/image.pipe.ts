import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value) {
      return 'http://localhost:3000/' + value;
    } else {
      return 'assets/images/default.jpg';
    }
  }

}
