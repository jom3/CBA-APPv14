import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proveedoresFiltro'
})
export class ProveedoresPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length<3) return value;
    const resultados = [];
    for(const prov of value){
      if(( prov.nombre.toLowerCase().indexOf(arg.toLowerCase())) > -1){
        resultados.push(prov);
      }
    }
    return resultados;
}

}
