import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservacionesService } from '../../../../servicios/observaciones.service';
import { PersonasService } from '../../../../servicios/personas.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProyectosService } from '../../../../servicios/proyectos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.css']
})
export class ObservacionesComponent implements OnInit {
  Modalref!: NgbModalRef;
  observaciones:any;
  osForm!:UntypedFormGroup;
  durationInSeconds = 1000;
  codpro:any;
  codper:number;
  p: number = 1;
  datos:any =[];
  mensaje:any;
  proyecto:any;
  constructor(
    private location:LocationStrategy,
    private ac: ActivatedRoute,
    private router: Router,
    private os: ObservacionesService,
    private ps: PersonasService,
    private fb: UntypedFormBuilder,
    private modal: NgbModal,
    private pr:ProyectosService,
    private sBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(this.ac.snapshot.params.codpro){
      this.codpro = this.ac.snapshot.params.codpro;
      this.listarObservacionesbyProyecto(this.codpro);
      this.listarProyecto(this.codpro);
    }else{
      if(localStorage.getItem('codigo')){
        this.codper = parseInt(localStorage.getItem('codigo'));
        this.listarMisObservaciones(this.codper);
      }else{
        this.listarObservaciones();
      }
    }
  }
  listarProyecto(codpro:number){
    this.pr.listarProyecto(codpro).subscribe(res=>{
      this.proyecto = res;
    })
  }
  listarObservaciones(){
    this.os.listarObservaciones().subscribe(res=>{
      this.observaciones = res;
    })
  }
  listarMisObservaciones(codper:number){
    this.os.listarMisObservaciones(codper).subscribe(res=>{
      this.observaciones = res;
    })
  }
  listarObservacionesbyProyecto(codpro: number){
    this.os.listarObservacionesbyProyecto(codpro).subscribe(res=>{
      this.observaciones = res;
    })
  }
  registrarNuevo(){
    this.router.navigate([`/observaciones/registrarObservacion/${this.codpro}`])
  }
  eliminar(modal:any, codo:number,razon:string,estado:number){
    this.datos = [{codo:codo,razon:razon,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  del(codo:number){
    this.os.eliminarObservacion(codo).subscribe(res => {
      this.mensaje = res;
        this.sBar.open(this.mensaje.mensaje, '', {
          duration: 5 * this.durationInSeconds,
          horizontalPosition: 'end',
          panelClass: ['snackbar'],
        });
      this.listarObservacionesbyProyecto(this.codpro)
      this.Modalref.close();
    })
  }
  completar(modal:any, codo:number,razon:string,estado:number){
    this.datos = [{codo:codo,razon:razon,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  con(codo:number){
    this.os.bloquearObservacion(codo).subscribe(res => {
      this.mensaje = res;
        this.sBar.open(this.mensaje.mensaje, '', {
          duration: 5 * this.durationInSeconds,
          horizontalPosition: 'end',
          panelClass: ['snackbar'],
        });
      this.listarObservacionesbyProyecto(this.codpro)
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
