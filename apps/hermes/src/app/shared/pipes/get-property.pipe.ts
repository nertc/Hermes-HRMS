import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getProperty',
})
export class GetPropertyPipe implements PipeTransform {
  transform(value: Record<string, any>[], ...args: string[]): unknown {
    if (args.length === 0) {
      return [];
    }
    if (args.length === 1) {
      return value.map((val) => val[args[0]]);
    }
    return value.map((val) => args.map((arg) => val[arg]));
  }
}
