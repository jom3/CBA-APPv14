import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personas'
})
export class PersonasPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length<3) return value;
    const resultados = [];
    for(const per of value){
      if((per.nombre.indexOf(arg.toLowerCase()) && per.ap.indexOf(arg.toLowerCase()) && per.am.indexOf(arg.toLowerCase())) > -1){
        resultados.push(per);
      }
    }
    return resultados;
  }

}
