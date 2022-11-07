import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'institucionesFiltro'
})
export class InstitucionesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length<3) return value;
    const resultados = [];
    for(const ins of value){
      if(( ins.nombre.toLowerCase().indexOf(arg.toLowerCase())) > -1){
        resultados.push(ins);
      }
    }
    return resultados;
}

}
