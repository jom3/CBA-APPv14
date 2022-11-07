import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProveedoresService } from '../../../../servicios/proveedores.service';

@Component({
  selector: 'app-ver-proveedores',
  templateUrl: './ver-proveedores.component.html',
  styleUrls: ['./ver-proveedores.component.css']
})
export class VerProveedoresComponent implements OnInit {
  mensaje:any;
  Modalref!: NgbModalRef;
  proveedores:any=[];
  datos:any =[];

  constructor(private provService:ProveedoresService, private fb: UntypedFormBuilder, private router:Router, private ac:ActivatedRoute, private modal: NgbModal) { }

  ngOnInit(): void {
    this.listarProveedor();
  }
  listarProveedor(){
    const codprov = this.ac.snapshot.params.codprov;
    this.provService.listarProveedor(codprov).subscribe(res =>{
      this.proveedores = res;
    })
  }
  eliminar(modal:any, codprov:number,nombre:string,descripcion:string,estado:number){
    this.datos = [{codprov:codprov,nombre:nombre, descripcion:descripcion,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  del(codprov:number){
    this.provService.eliminarProveedor(codprov).subscribe(res => {
      this.mensaje = res;
      this.router.navigate(['/proveedores']);
      this.Modalref.close();
    })
  }
  restaurar(modal:any, codprov:number,nombre:string,descripcion:string,estado:number){
    this.datos = [{codprov:codprov,nombre:nombre, descripcion:descripcion,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  res(codprov:number){
    this.provService.restaurarProveedor(codprov).subscribe(res => {
      this.mensaje = res;
      this.router.navigate(['/proveedores']);
      this.Modalref.close();
    })
  }
  cancelar(){
    this.router.navigate(['/proveedores']);
    this.Modalref.close();
  }
}
