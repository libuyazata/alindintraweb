import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dictToKeyVal'})
export class DictToKeyVal implements PipeTransform {
  transform(value : any, args:string[]) : any {
    let arr = [];
    for (let key in value) {
      arr.push({key: key, value: value[key]});
    }
    return arr;
  }
}