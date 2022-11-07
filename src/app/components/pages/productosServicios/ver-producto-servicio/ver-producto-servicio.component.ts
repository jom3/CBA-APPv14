import { Component, OnInit } from '@angular/core';
import { ProductosServiciosService } from '../../../../servicios/productos-servicios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { ProveedoresService } from '../../../../servicios/proveedores.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ver-producto-servicio',
  templateUrl: './ver-producto-servicio.component.html',
  styleUrls: ['./ver-producto-servicio.component.css']
})
export class VerProductoServicioComponent implements OnInit {
  durationInSeconds = 1000;
  productosServicios:any;
  proveedor:any;
  datos:any;
  Modalref: NgbModalRef;
  mensaje:any;
  codps:number;
  rol:any;
  constructor(
    private pss:ProductosServiciosService,
    private ps: ProveedoresService,
    private ac: ActivatedRoute,
    private router:Router,
    private modal: NgbModal,
    private location: LocationStrategy,
    private sBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('rol')){
      this.rol= localStorage.getItem('rol');
    }
    if(this.ac.snapshot.paramMap.get('codps')){
      this.codps = parseInt(this.ac.snapshot.paramMap.get('codps'));
      this.listarPS(this.codps);
    }
  }
  listarPS(codps: number){
    this.pss.listarProductoServicio(codps).subscribe(res=>{
      this.productosServicios = res;
      this.ps.listarProveedor(this.productosServicios[0].codprov).subscribe(res=>{
        this.proveedor = res;
      })
    })
  }
  eliminar(modal:any, codps:number,nombre:string,descripcion:string,estado:number){
    this.datos = [{codps:codps, nombre:nombre, descripcion:descripcion, estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  del(codps:number){
    this.pss.eliminarProductoServicio(codps).subscribe(res => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje, '', {
        duration: 5 * this.durationInSeconds,
        horizontalPosition: 'end',
        panelClass: ['snackbar'],
      });
      this.location.back();
      this.Modalref.close();
    })
  }
  restaurar(modal:any, codps:number,nombre:string,descripcion:string,estado:number){
    this.datos = [{codps:codps, nombre:nombre, descripcion:descripcion, estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  res(codps:number){
    this.pss.restaurarProductoServicio(codps).subscribe(res => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje, '', {
        duration: 5 * this.durationInSeconds,
        horizontalPosition: 'end',
        panelClass: ['snackbar'],
      });
      this.location.back();
      this.Modalref.close();
    })
  }
  cancelar(){
    this.Modalref.close();
  }
  cerrar(){
    this.location.back()
  }
}
