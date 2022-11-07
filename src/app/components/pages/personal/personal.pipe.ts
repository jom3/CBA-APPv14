import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personalFiltro'
})
export class PersonalPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length<3) return value;
    const resultados = [];
    for(const pel of value){
      if((pel.nombre.toLowerCase().indexOf(arg.toLowerCase()) && pel.ap.toLowerCase().indexOf(arg.toLowerCase()) && pel.am.toLowerCase().indexOf(arg.toLowerCase())) > -1){
        resultados.push(pel);
      }
    }
    return resultados;
  }

}
