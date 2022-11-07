import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InstitucionesService } from '../../../../servicios/instituciones.service';
import { LocationStrategy } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ver-instituciones',
  templateUrl: './ver-instituciones.component.html',
})
export class VerInstitucionesComponent implements OnInit {
  mensaje:any;
  Modalref!: NgbModalRef;
  datos:any;
  instituciones:any;
  codi:number;
  durationInSeconds = 1000;
  rol:any;

  constructor(
    private is:InstitucionesService,
    private ac:ActivatedRoute,
    private modal: NgbModal,
    private location: LocationStrategy,
    private sBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem('rol')){
      this.rol= localStorage.getItem('rol');
    }
    if(this.ac.snapshot.paramMap.get('codi')){
      this.codi = parseInt(this.ac.snapshot.paramMap.get('codi'));
      this.listarInstitucion(this.codi);
    }
  }
  listarInstitucion(codi:number){
    this.is.listarInstitucion(codi).subscribe(res =>{
      this.instituciones = res;
    })
  }
  eliminar(modal:any, codi:number,nombre:string,descripcion:string,estado:number){
    this.datos = [{codi:codi,nombre:nombre, descripcion:descripcion,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  del(codi:number){
    this.is.eliminarInstitucion(codi).subscribe(res => {
      this.mensaje = res;
          this.sBar.open(this.mensaje.mensaje,'',
          {
            duration: 5*this.durationInSeconds,
            horizontalPosition:"end",
            panelClass: ['snackbar']
          });
          this.location.back();
          this.Modalref.close();
    })
  }
  restaurar(modal:any, codi:number,nombre:string,descripcion:string,estado:number){
    this.datos = [{codi:codi,nombre:nombre, descripcion:descripcion,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  res(codi:number){
    this.is.restaurarInstitucion(codi).subscribe(res => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje,'',
      {
        duration: 5*this.durationInSeconds,
        horizontalPosition:"end",
        panelClass: ['snackbar']
      });
      this.location.back();
      this.Modalref.close();
    })
  }
  cancelar(){
    this.location.back();
    this.Modalref.close();
  }
}
