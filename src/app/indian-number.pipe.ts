import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indianNumber'
})
export class IndianNumberPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  // transform(value: number | string, ...args: unknown[]): string {
  //   if (value === null || value === undefined) return '';
    
  //   let numberString = value.toString();
  //   let lastThree = numberString.slice(-3);
  //   let otherNumbers = numberString.slice(0, -3);
    
  //   if (otherNumbers !== '') {
  //     lastThree = ',' + lastThree;
  //   }
    
  //   let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  //   return result;
  // }




  transform(value: number | string, ...args: unknown[]): string {
    // Handle null, undefined, or NaN values
    if (value === null || value === undefined || isNaN(Number(value))) {
        return '0';
    }

    let numberString = value.toString();
    let lastThree = numberString.slice(-3);
    let otherNumbers = numberString.slice(0, -3);

    if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
    }

    let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return result;
  }

}
