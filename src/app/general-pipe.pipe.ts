import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalPipe',
  pure: true
})
export class GeneralPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value;
  }

}
