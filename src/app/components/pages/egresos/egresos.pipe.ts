import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'egresosFiltro'
})
export class EgresosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length<3) return value;
    const resultados = [];
    for(const egre of value){
      if(( egre.nombre.toLowerCase().indexOf(arg.toLowerCase())) > -1){
        resultados.push(egre);
      }
    }
    return resultados;
}

}
