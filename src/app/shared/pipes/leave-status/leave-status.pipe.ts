import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'leaveStatus'})
export class LeaveStatus implements PipeTransform {
  transform(value: number): string {
    let formattedValue: string = "";
    if(value == 0) {
        formattedValue = "Pending"; // Absent
    } else if (value == 1){
        formattedValue = "Rejected"; 
    } else if (value == 2){
        formattedValue = "Approved";
    } else {
        formattedValue = value.toString();
    }
    return formattedValue;
  }
}