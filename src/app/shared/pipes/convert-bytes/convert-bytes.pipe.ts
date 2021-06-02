import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "convertSizeInBytes"
})
export class ConvertSizeInBytes implements PipeTransform {

    transform(val: any): string {
        const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let l = 0;
        let num = parseInt(val, 10) || 0;
        while(num >= 1024 && ++l){
            num = num/1024;
        }
        // Include a decimal point and a tenths-place digit if presenting 
        // less than ten of KB or greater units
        return(num.toFixed(num < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
    }
}