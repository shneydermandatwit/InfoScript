import { Pipe, PipeTransform } from '@angular/core';
import {formatDistanceToNow} from 'date-fns';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(!value){return 'Invalid Date'};

    try{
      return formatDistanceToNow(new Date(value as string), { addSuffix: true });
    }catch(error){
      return "Invalid Date"
    }
  }

}
