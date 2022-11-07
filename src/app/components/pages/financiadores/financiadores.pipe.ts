import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'financiadoresFiltro'
})
export class FinanciadoresPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length<3) return value;
    const resultados = [];
    for(const finan of value){
      if(( finan.nombre.toLowerCase().indexOf(arg.toLowerCase())) > -1){
        resultados.push(finan);
      }
    }
    return resultados;
}

}
