import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'archivosFiltro'
})
export class ArchivosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length<3) return value;
    const resultados = [];
    for(const ar of value){
      if(( ar.nombre.toLowerCase().indexOf(arg.toLowerCase())) > -1){
        resultados.push(ar);
      }
    }
    return resultados;
}

}
