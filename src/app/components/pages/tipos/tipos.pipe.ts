import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiposFiltro'
})
export class TiposPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length<3) return value;
    const resultados = [];
    for(const tip of value){
      if(( tip.nombre.toLowerCase().indexOf(arg.toLowerCase())) > -1){
        resultados.push(tip);
      }
    }
    return resultados;
}

}
