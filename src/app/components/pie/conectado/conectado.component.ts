import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servicios/login.service';
import { PersonasService } from '../../../servicios/personas.service';
import { RolesService } from '../../../servicios/roles.service';

@Component({
  selector: 'app-conectado',
  templateUrl: './conectado.component.html',
  styleUrls: ['./conectado.component.css']
})
export class ConectadoComponent implements OnInit {
  codper:any;
  usuario:any;
  obRol:any;
  rol:any;
  constructor(
    private perService:PersonasService,
    private logService:LoginService,
    private rs: RolesService
    ) { }
  ngOnInit(): void {
    if(this.logService.islogged()){
      this.codper = localStorage.getItem('codigo')
      this.obtenerUsuario(this.codper);
      this.obtenerRol(this.codper)
    }
  }
  obtenerUsuario(codper:number){
    this.perService.listarPersona(codper).subscribe(res=>{
      this.usuario = res;
    })
  }
  obtenerRol(codper:number){
    this.rs.obtenerRol(codper).subscribe(res=>{
      this.obRol = res;
      this.rol = this.obRol.nombre
    })
  }
}
