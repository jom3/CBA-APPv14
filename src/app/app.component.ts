import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './servicios/login.service';
import { valorReloj, XsegundoService } from './servicios/reloj.service';
import { RolesService } from './servicios/roles.service';
import { LocationStrategy } from '@angular/common';
import { flattenDiagnosticMessageText } from 'typescript';
import { EquiposService } from './servicios/equipos.service';
import { PersonasService } from './servicios/personas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  datos$!: Observable<valorReloj>;
  hora!: number;
  minutos!: string;
  dia!: string;
  fecha!: string;
  ampm!: string;
  segundos!: string;
  ress:any;
  rol:any;
  respuesta:any;
  estado:boolean;
  codper:any;
  equipos:any;
constructor(
  public logService:LoginService,
  private es: EquiposService,
  private segundo: XsegundoService,
  private router: Router,
  private location:LocationStrategy,
  private ps: PersonasService
  ){}
ngOnInit(){
  this.datos$=this.segundo.getInfoReloj();
  this.datos$.subscribe(x => {
    this.hora = x.hora;
    this.minutos = x.minutos;
    this.dia = x.diadesemana;
    this.fecha = x.diaymes;
    this.ampm = x.ampm;
    this.segundos = x.segundo
  });
  if(localStorage.getItem('rol') && localStorage.getItem('codigo')){
    this.rol = localStorage.getItem('rol')
    this.codper = localStorage.getItem('codigo');
    // this.listarEstado(this.codper);
  }
}
  iniciarSession(){
    this.router.navigate(['/login']);
  }
  cerrarSession(){
    this.logService.logout().subscribe(res=>{
      console.log(res);
    })
  }
  // listarEstado(codper:number){
  //   this.ps.listarEstado(codper).subscribe(res=>{
  //     this.respuesta = res;
  //     if(this.respuesta[0].estado == 1){
  //       this.estado = true;
  //     }else{
  //       this.estado = false;
  //     }
  //   })
  // }
  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
}
