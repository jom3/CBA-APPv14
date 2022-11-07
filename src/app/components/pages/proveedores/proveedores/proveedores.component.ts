import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedores } from '../../../../../models/Proveedores';
import { ProveedoresService } from '../../../../servicios/proveedores.service';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
})
export class ProveedoresComponent implements OnInit {
  durationInSeconds = 1000;
  proveedores: any;
  filtroProveedores = '';
  Modalref!: NgbModalRef;
  p: number = 1;
  mensaje: any;
  datos: any;
  rol:any;
  constructor(
    private router: Router,
    private ps: ProveedoresService,
    private fb: UntypedFormBuilder,
    private sBar: MatSnackBar,
    private modal: NgbModal
  ) {}
  ngOnInit(): void {
    if(localStorage.getItem('rol')){
      this.rol= localStorage.getItem('rol');
    }
    this.listarProveedores();
  }
  listarProveedores() {
    this.ps.listarProveedores().subscribe((res) => {
      this.proveedores = res;
    });
  }
  registrarNuevo() {
    this.router.navigate(['/proveedores/registrarProveedor']);
  }
  eliminar(
    modal: any,
    codprov: number,
    nombre: string,
    descripcion: string,
    estado: number
  ) {
    this.datos = [
      {
        codprov: codprov,
        nombre: nombre,
        descripcion: descripcion,
        estado: estado,
      },
    ];
    this.Modalref = this.modal.open(modal, { centered: true, size: 'sm' });
  }
  del(codprov: number) {
    this.ps.eliminarProveedor(codprov).subscribe((res) => {
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
  restaurar(
    modal: any,
    codprov: number,
    nombre: string,
    descripcion: string,
    estado: number
  ) {
    this.datos = [
      {
        codprov: codprov,
        nombre: nombre,
        descripcion: descripcion,
        estado: estado,
      },
    ];
    this.Modalref = this.modal.open(modal, { centered: true, size: 'sm' });
  }
  res(codprov: number) {
    this.ps.restaurarProveedor(codprov).subscribe((res) => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje, '', {
        duration: 5 * this.durationInSeconds,
        horizontalPosition: 'end',
        panelClass: ['snackbar'],
      });
      this.ngOnInit();
      this.Modalref.close();
    });
  }
  cancelar() {
    this.Modalref.close();
  }
}
