import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'equiposFiltro'
})
export class EquiposPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length<3) return value;
    const resultados = [];
    for(const eq of value){
      if(( eq.titulo.toLowerCase().indexOf(arg.toLowerCase()) && eq.nombre.toLowerCase().indexOf(arg.toLowerCase()) && eq.ap.toLowerCase().indexOf(arg.toLowerCase()) && eq.am.toLowerCase().indexOf(arg.toLowerCase())) > -1){
        resultados.push(eq);
      }
    }
    return resultados;
}

}
