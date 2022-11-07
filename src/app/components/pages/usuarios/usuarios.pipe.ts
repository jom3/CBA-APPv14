import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuariosFiltro'
})
export class UsuariosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length<3) return value;
    const resultados = [];
    for(const usu of value){
      if((usu.nombre.toLowerCase().indexOf(arg.toLowerCase()) && usu.ap.toLowerCase().indexOf(arg.toLowerCase()) && usu.am.toLowerCase().indexOf(arg.toLowerCase())) > -1){
        resultados.push(usu);
      }
    }
    return resultados;
  }

}
