import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ingresosFiltro'
})
export class IngresosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length<3) return value;
    const resultados = [];
    for(const ing of value){
      if(( ing.nombre.toLowerCase().indexOf(arg.toLowerCase())) > -1){
        resultados.push(ing);
      }
    }
    return resultados;
}

}
