import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolesFiltro'
})
export class RolesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length<3) return value;
    const resultados = [];
    for(const rol of value){
      if(( rol.nombre.toLowerCase().indexOf(arg.toLowerCase())) > -1){
        resultados.push(rol);
      }
    }
    return resultados;
}

}
