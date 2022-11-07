import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from '../../../../servicios/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  durationInSeconds = 1000;
  rol:any;
  roles:any;
  filtroRoles = '';
  p: number = 1;
  Modalref: NgbModalRef;
  mensaje:any;
  datos:any;
  constructor(
    private router:Router,
    private modal: NgbModal,
    private rs: RolesService,
    private sBar: MatSnackBar,
    ) { }
  ngOnInit(): void {
    this.listarRoles();
  }
    listarRoles(){
      this.rs.listarRoles().subscribe(res=>{
        this.roles = res;
      })
    }
  registrarNuevo(){
    this.router.navigate(['/roles/registrarRol'])
  }
  eliminar(modal:any, codrol:number,nombre:string,descripcion:string,estado:number){
    this.datos = [{codrol:codrol,nombre:nombre, descripcion:descripcion,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  del(codrol:number){
    this.rs.eliminarRol(codrol).subscribe(res => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje, '', {
        duration: 5 * this.durationInSeconds,
        horizontalPosition: 'end',
        panelClass: ['snackbar'],
      });
      this.ngOnInit();
      this.Modalref.close();
    })
  }
  restaurar(modal:any, codrol:number,nombre:string,descripcion:string,estado:number){
    this.datos = [{codrol:codrol,nombre:nombre, descripcion:descripcion,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  res(codrol:number){
    this.rs.restaurarRol(codrol).subscribe(res => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje, '', {
        duration: 5 * this.durationInSeconds,
        horizontalPosition: 'end',
        panelClass: ['snackbar'],
      });
      this.ngOnInit();
      this.Modalref.close();
    })
  }
  cancelar(){
    this.Modalref.close();
  }
}
