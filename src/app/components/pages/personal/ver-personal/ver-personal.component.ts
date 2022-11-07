import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PersonalService } from '../../../../servicios/personal.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-ver-personal',
  templateUrl: './ver-personal.component.html',
  styleUrls: ['./ver-personal.component.css']
})
export class VerPersonalComponent implements OnInit {
  durationInSeconds = 1000;
  mensaje:any;
  Modalref: NgbModalRef;
  personal:any;
  datos:any;
  codper:number;
  constructor(
    private router:Router,
    private ac:ActivatedRoute,
    private modal: NgbModal,
    private ps:PersonalService,
    private sBar: MatSnackBar,
    private location: LocationStrategy
  ) { }

  ngOnInit(): void {
    if(this.ac.snapshot.paramMap.get('codper')){
      this.codper = parseInt(this.ac.snapshot.paramMap.get('codper'));
      this.listarPersonal(this.codper);
    }
  }
  listarPersonal(codper:number){
    this.ps.listarPersonal(codper).subscribe(resp =>{
      this.personal = resp;
      })
  }
  eliminar(modal:any, codper:number,nombre:string,ap:string,am:string,estado:number){
    this.datos = [{codper:codper,nombre:nombre, ap:ap,am:am ,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  del(codper:number){
    this.ps.eliminarPersonal(codper).subscribe(res => {
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
  restaurar(modal:any, codper:number,nombre:string,ap:string,am:string,estado:number){
    this.datos = [{codper:codper,nombre:nombre, ap:ap,am:am ,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  res(codper:number){
    this.ps.restaurarPersonal(codper).subscribe(res => {
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
  cerrarModal(){
    this.Modalref.close();
  }
  cancelar(){
    this.location.back();
  }
}
