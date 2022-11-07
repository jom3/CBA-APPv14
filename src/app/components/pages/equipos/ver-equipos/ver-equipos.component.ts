import { Component, OnInit } from '@angular/core';
import { MiembrosService } from '../../../../servicios/miembros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolesService } from '../../../../servicios/roles.service';
import { ProyectosService } from '../../../../servicios/proyectos.service';

@Component({
  selector: 'app-ver-equipos',
  templateUrl: './ver-equipos.component.html',
  styleUrls: ['./ver-equipos.component.css']
})
export class VerEquiposComponent implements OnInit {
  durationInSeconds = 1000;
  proyecto:any;
  miembros:any;
  Modalref: NgbModalRef;
  p: number = 1;
  codper:any;
  codeq:number
  codpro:number;
  mensaje:any;
  datos:any;
  rol:any;
  roleq:any;
  rolper:any;
  status:any;
  constructor(
    private ms: MiembrosService,
    private ac: ActivatedRoute,
    private router: Router,
    private modal: NgbModal,
    private sBar: MatSnackBar,
    private rs: RolesService,
    private ps: ProyectosService
  ) { }

  ngOnInit(): void {
      if(localStorage.getItem('rol')){
        this.rol= localStorage.getItem('rol');
      }
    if(this.ac.snapshot.paramMap.get('codeq')){
      this.codeq = parseInt(this.ac.snapshot.paramMap.get('codeq'));
      this.listarProyectobyEquipo(this.codeq);
      if(localStorage.getItem('codigo')){
        this.codper = parseInt(localStorage.getItem('codigo'));
        this.listarRolEquipo(this.codper, this.codeq);
      }
      this.listarMiembros(this.codeq);
    }else{
      if(this.ac.snapshot.paramMap.get('codpro')){
        this.codpro = parseInt(this.ac.snapshot.paramMap.get('codpro'));
        this.listarProyecto(this.codpro);
        this.listarMiembrosbyProyecto(this.codpro);
      }
    }
  }
  listarProyectobyEquipo(codeq:number){
    this.ps.listarProyectobyEquipo(codeq).subscribe(res=>{
      this.proyecto = res;
      this.status = this.proyecto[0].estado;
      this.codpro = this.proyecto[0].codpro;
    })
  }
  listarRolEquipo(codper:number, codeq:number){
    this.ms.listarRolEquipo(codper,codeq).subscribe(res=>{
      this.roleq = res;
      this.rolper = this.roleq[0].nomrol;
    })
  }
  listarProyecto(codpro:number){
    this.ps.listarProyecto(codpro).subscribe(res=>{
      this.proyecto =res;
    })
  }
  listarMiembros(codeq:number){
    this.ms.listarMiembros(codeq).subscribe(res=>{
      this.miembros = res;
    })
  }
  listarMiembrosbyProyecto(codpro:number){
    this.ms.listarMiembrosbyProyecto(codpro).subscribe(res=>{
      this.miembros = res;
    })
  }
  registrarNuevo(){
    this.router.navigate([`/equipos/registrarMiembro/${this.codeq}`])
  }
  eliminar(modal:any, codmiem:number,nombre:string,ap:string,am:string,estado:number){
    this.datos = [{codmiem:codmiem,nombre:nombre, ap:ap,am:am ,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  del(codmiem:number){
    this.ms.eliminarMiembro(codmiem).subscribe(res => {
      this.mensaje = res;
          this.sBar.open(this.mensaje.mensaje,'',
          {
            duration: 5*this.durationInSeconds,
            horizontalPosition:"end",
            panelClass: ['snackbar']
          });
      this.listarMiembros(this.codeq);
      this.Modalref.close();
    })
  }
  restaurar(modal:any, codmiem:number,nombre:string,ap:string,am:string,estado:number){
    this.datos = [{codmiem:codmiem,nombre:nombre, ap:ap,am:am ,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  res(codmiem:number){
    this.ms.restaurarMiembro(codmiem).subscribe(res => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje,'',
          {
            duration: 5*this.durationInSeconds,
            horizontalPosition:"end",
            panelClass: ['snackbar']
          });
      this.listarMiembros(this.codeq);
      this.Modalref.close();
    })
  }
  cancelar(){
    this.Modalref.close();
  }
  verProyecto(){
    this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);
  }
}
