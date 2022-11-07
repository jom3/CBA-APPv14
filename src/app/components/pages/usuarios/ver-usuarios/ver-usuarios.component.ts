import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../../../../servicios/usuarios.service';
import { LocationStrategy } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit {
  durationInSeconds = 1000;
  mensaje:any;
  Modalref: NgbModalRef;
  usuario:any;
  datos:any;
  codper:number;
  constructor(
    private router:Router,
    private ac:ActivatedRoute,
    private modal: NgbModal,
    private us:UsuariosService,
    private sBar: MatSnackBar,
    private location: LocationStrategy
    ) { }

  ngOnInit(): void {
    if(this.ac.snapshot.paramMap.get('codper')){
      this.codper = parseInt(this.ac.snapshot.paramMap.get('codper'));
      this.listarUsuario(this.codper);
    }
  }
  listarUsuario(codper:number){
    this.us.listarUsuario(codper).subscribe(res =>{
      this.usuario = res;
      })
  }
  eliminar(modal:any, codper:number,nombre:string,ap:string,am:string,estado:number){
    this.datos = [{codper:codper,nombre:nombre, ap:ap,am:am ,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  del(codper:number){
    this.us.eliminarUsuario(codper).subscribe(res => {
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
    this.us.restaurarUsuario(codper).subscribe(res => {
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
  }
  cancelarModal(){
    this.Modalref.close();
  }
}
