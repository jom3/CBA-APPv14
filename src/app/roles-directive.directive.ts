import { Directive, OnInit } from '@angular/core';
import { RolesService } from './servicios/roles.service';

@Directive({
  selector: '[appRolesDirective]'
})
export class RolesDirectiveDirective implements OnInit {
  codper:any;
  rol:any;
  constructor(
    private rs: RolesService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('codigo')){
      this.codper = parseInt(localStorage.getItem('codigo'));
      this.obtenerRol(this.codper);
    }
  }
  obtenerRol(codper:number){
    this.rs.obtenerRol(codper).subscribe(res=>{
      this.rol = res;
      console.log(this.rol)
    })
  }
}
