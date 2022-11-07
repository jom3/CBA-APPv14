import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FinanciadoresService } from '../../../../servicios/financiadores.service';

@Component({
  selector: 'app-financiadores',
  templateUrl: './financiadores.component.html',
  styleUrls: ['./financiadores.component.css']
})
export class FinanciadoresComponent implements OnInit {
  durationInSeconds = 1000;
  financiadores:any;
  filtroFinanciadores = '';
  filtroFp = '';
  Modalref!: NgbModalRef;
  p: number = 1;
  datos:any;
  mensaje:any;
  rol:any;
  constructor(
    private modal: NgbModal,
    private fs:FinanciadoresService,
    private router:Router,
    private sBar: MatSnackBar,
  ){}
  ngOnInit(): void {
    if(localStorage.getItem('rol')){
      this.rol= localStorage.getItem('rol');
    }
    this.listarFinanciadores();
    }
  registrarNuevo(){
    this.router.navigate(['/financiadores/registrarFinanciador'])
  }
  listarFinanciadores(){
    this.fs.listarFinanciadores().subscribe(res =>{
      this.financiadores = res;
      })
  }
  eliminar(modal:any, codtipo:number,nombre:string,descripcion:string,estado:number){
    this.datos = [{codtipo:codtipo,nombre:nombre, descripcion:descripcion,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  del(codf:number){
    this.fs.eliminarFinanciador(codf).subscribe(res => {
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
  restaurar(modal:any, codtipo:number,nombre:string,descripcion:string,estado:number){
    this.datos = [{codtipo:codtipo,nombre:nombre, descripcion:descripcion,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  res(codf:number){
    this.fs.restaurarFinanciador(codf).subscribe(res => {
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
}
