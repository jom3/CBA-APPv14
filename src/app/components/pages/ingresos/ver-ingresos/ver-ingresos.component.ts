import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IngresosService } from '../../../../servicios/ingresos.service';
import { ProyectosService } from '../../../../servicios/proyectos.service';
import { FinanciadoresService } from '../../../../servicios/financiadores.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ver-ingresos',
  templateUrl: './ver-ingresos.component.html',
  styleUrls: ['./ver-ingresos.component.css']
})
export class VerIngresosComponent implements OnInit {
  durationInSeconds = 1000;
  coding:number;
  ingresos:any;
  proyectos:any;
  financiador!:any;
  datos:any;
  Modalref: NgbModalRef;
  mensaje:any;
  codper:number;
  codpro:any;
  constructor(
    private is:IngresosService,
    private ps: ProyectosService,
    private fn: FinanciadoresService,
    private ac: ActivatedRoute,
    private router:Router,
    private sBar: MatSnackBar,
    private modal: NgbModal,
    private location: LocationStrategy
    ) { }

    ngOnInit(): void {
      if(this.ac.snapshot.paramMap.get('coding')){
        this.coding = parseInt(this.ac.snapshot.paramMap.get('coding'));
        this.codper = parseInt(localStorage.getItem('codigo'));
        this.listarIngreso(this.coding);
      }
    }
    listarIngreso(coding:number){
      this.is.Ingreso(coding).subscribe(res=>{
        this.ingresos = res;
        this.codpro = this.ingresos[0].codpro;
        this.ps.listarProyecto(this.ingresos[0].codpro).subscribe(res=>{
          this.proyectos = res;
      });
      this.fn.listarFinanciador(this.ingresos[0].codf).subscribe(res=>{
        this.financiador = res;
      })
    })
  }
  eliminar(modal:any, coding:number, nombre:string, ingreso:number, idivisa:string, codpro:number, estado:number){
    this.datos = [{coding,nombre, ingreso,idivisa, codpro, estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  del(coding:number){
    this.is.eliminarIngreso(coding, this.codper).subscribe(res => {
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
  restaurar(modal:any, coding:number, nombre:string, ingreso:number, idivisa:string, codpro:number, estado:number){
    this.datos = [{coding,nombre, ingreso,idivisa, codpro, estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  res(coding:number){
    this.is.restaurarIngreso(coding, this.codper).subscribe(res => {
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
  confirmar(modal:any, coding:number, nombre:string, ingreso:number, idivisa:string, codpro:number, estado:number){
    this.datos = [{coding,nombre, ingreso,idivisa, codpro, estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  conf(coding:number){
    this.is.confirmarIngreso(coding, this.codper).subscribe(res => {
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
  cancelar(): void {
    this.location.back();
  }
  cerrar(){
    this.Modalref.close();
  }
  verProyecto(){
    this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);
    localStorage.removeItem('codpro');
    localStorage.removeItem('cambio');
  }
}
