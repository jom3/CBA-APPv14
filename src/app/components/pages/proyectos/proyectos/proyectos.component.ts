import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ProyectosService } from '../../../../servicios/proyectos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Personas } from '../../../../../models/Personas';
import { PersonasService } from '../../../../servicios/personas.service';
import { RolesService } from '../../../../servicios/roles.service';
import { LoginService } from '../../../../servicios/login.service';
import { BeneficiariosService } from '../../../../servicios/beneficiarios.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  radio:number = 1;
  proyectos:any;
  durationInSeconds = 1000;
  filtroProyectos = '';
  persona:Personas;
  p: number = 1;
  valor:any;
  rol:any;
  codigo:number;
  codper:number;
  codpro:number;
  ress:any;
  Modalref!: NgbModalRef;
  datos:any;
  mensaje:any;
  codigopro:any;
  status:boolean;
  constructor(
    private fb: UntypedFormBuilder,
    private proService: ProyectosService,
    private ac: ActivatedRoute,
    private router: Router,
    private rs: RolesService,
    public ls: LoginService,
    private bs:BeneficiariosService,
    private modal: NgbModal,
    private sBar: MatSnackBar,
    private dialog: MatDialog
    ) { }

    ngOnInit(): void {
      if(localStorage.getItem('codigo')){
        this.codigo = parseInt(localStorage.getItem('codigo'));
        this.rs.obtenerRol(this.codigo).subscribe(res=>{
          this.valor = res;
          if(this.ac.snapshot.paramMap.get('codper')){
            this.codper = parseInt(this.ac.snapshot.paramMap.get('codper'));
          }
          this.rol = this.valor.nombre;
          if(this.codper){
            this.listarProyectosbyMiembro(this.codper);
          }else{
            if(this.rol == 'Usuario'){
              this.listarProyectosPublicos();
            }else{
              if(this.rol == 'Administrador'){
                this.listarProyectos();
            }else{
              if(this.rol == 'Observador' || this.rol == 'Personal'){
                this.listarProyectosbyMiembro(this.codigo);
              }else{
                this.listarProyectosPublicos();
              }
            }
          }
        }
      })
    }else{
      this.listarProyectosPublicos();
    }
  }
  onItemChange(e:any) {
    if(e.source.value==1){
      this.listarProyectos();
    }else if(e.source.value==2){
      this.listarProyectosActivos();
    }else if(e.source.value==3){
      this.listarProyectosInactivos();
    }
}
  listarProyectos(){
    this.proService.listarProyectos().subscribe(res=>{
      this.proyectos = res;
    })
  }
  listarProyectosActivos(){
    this.proService.listarProyectosActivos().subscribe(res=>{
      this.proyectos = res;
    })
  }
  listarProyectosInactivos(){
    this.proService.listarProyectosInactivos().subscribe(res=>{
      this.proyectos = res;
    })
  }
  listarProyectosPublicos(){
    this.proService.listarProyectosPublicos().subscribe(res=>{
      this.proyectos = res;
    })
  }
  listarProyectosbyMiembro(codper:number){
    this.proService.listarProyectosbyMiembro(codper).subscribe(res=>{
      this.proyectos = res;
    })
  }
  registrarNuevo(){
    this.router.navigate(['/proyectos/registrarProyecto'])
  }
  eliminar(modal:any, codpro:number,titulo:string,estado:number){
    this.Modalref.close();
    this.proyectos = [{codpro:codpro,titulo:titulo,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  del(codpro:number){
    this.proService.eliminarProyecto(codpro).subscribe(res => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje,'',
      {
        duration: 5*this.durationInSeconds,
        horizontalPosition:"end",
        panelClass: ['snackbar']
      });
      this.ngOnInit();
      this.Modalref.close();
    })
  }
  restaurar(modal:any, codpro:number,titulo:string,estado:number){
    this.Modalref.close();
    this.datos = [{codpro:codpro,titulo:titulo,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  rest(codpro:number){
    this.proService.restaurarProyecto(codpro).subscribe(res => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje,'',
      {
        duration: 5*this.durationInSeconds,
        horizontalPosition:"end",
        panelClass: ['snackbar']
      });
      this.ngOnInit();
      this.Modalref.close();
    })
  }
  completar(modal:any, codpro:number,titulo:string,estado:number){
    this.Modalref.close();
    this.datos = [{codpro:codpro,titulo:titulo,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  comp(codpro:number){
    this.proService.completarProyecto(codpro).subscribe(res => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje,'',
      {
        duration: 5*this.durationInSeconds,
        horizontalPosition:"end",
        panelClass: ['snackbar']
      });
      this.ngOnInit();
      this.Modalref.close();
    })
  }
  opciones(modal:any, codpro:number,titulo:string,estado:number){
    this.datos = [{codpro:codpro,titulo:titulo,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  revision(modal:any, codpro:number,titulo:string,estado:number){
    this.datos = [{codpro:codpro,titulo:titulo,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  aceptar(modal:any, codpro:number,titulo:string,estado:number){
    this.Modalref.close();
    this.datos = [{codpro:codpro,titulo:titulo,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  accept(codpro:number){
    this.proService.aceptarProyecto(codpro).subscribe(res => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje,'',
      {
        duration: 5*this.durationInSeconds,
        horizontalPosition:"end",
        panelClass: ['snackbar']
      });
      this.ngOnInit();
      this.Modalref.close();
    })
  }
  rechazar(modal:any, codpro:number,titulo:string,estado:number){
    this.Modalref.close();
    this.datos = [{codpro:codpro,titulo:titulo,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  rech(codpro:number){
    this.proService.rechazarProyecto(codpro).subscribe(res => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje,'',
      {
        duration: 5*this.durationInSeconds,
        horizontalPosition:"end",
        panelClass: ['snackbar']
      });
      this.ngOnInit();
      this.Modalref.close();
    })
  }
  cancelar(){
    this.Modalref.close();
  }
  postular(codpro:number){
    const dialogRef = this.dialog.open(PostulacionDialog,{
      data: codpro
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  cerrar(){
    this.Modalref.close();
  }
}
@Component({
  selector: 'postulacion-dialog',
  templateUrl: 'postulacion-dialog.html',
  styleUrls: ['postulacion-dialog.css'],
})
export class PostulacionDialog implements OnInit{
  benForm:UntypedFormGroup;
  durationInSeconds:number = 1000;
  codper:number;
  codpro:number;
  proyectos:any;
  mensaje:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ps: ProyectosService,
    private sBar: MatSnackBar,
    private fb: UntypedFormBuilder,
    private bs: BeneficiariosService
    ){}
    ngOnInit(): void {
    this.benForm = this.fb.group({
      codpro:[''],
      codper:['']
    });
    this.listarProyecto(this.data);
  }
  listarProyecto(codpro:number){
    this.ps.listarProyecto(codpro).subscribe(res=>{
      this.proyectos = res;
    })
  }
  postular(codpro:number){
    this.codpro = codpro
    this.codper = parseInt(localStorage.getItem('codigo'));
    this.benForm.patchValue({
      codpro: this.codpro,
      codper: this.codper
    });
    const xben = this.benForm.value;
    this.bs.registrarBeneficiario(xben).subscribe(res=>{
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje,'',
      {
        duration: 5*this.durationInSeconds,
        horizontalPosition:"end",
        panelClass: ['snackbar']
      });
    })
  }
}
