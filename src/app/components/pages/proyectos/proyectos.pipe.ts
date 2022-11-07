import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proyectosFiltro'
})
export class ProyectosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length<3) return value;
    const resultados = [];
    for(const proy of value){
      if(( proy.titulo.toLowerCase().indexOf(arg.toLowerCase()) && proy.nombre.toLowerCase().indexOf(arg.toLowerCase()) && proy.ap.toLowerCase().indexOf(arg.toLowerCase()) && proy.am.toLowerCase().indexOf(arg.toLowerCase())) > -1){
        resultados.push(proy);
      }
    }
    return resultados;
}
}
