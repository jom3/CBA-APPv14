import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EgresosService } from '../../../../servicios/egresos.service';
import { PersonalService } from '../../../../servicios/personal.service';
import { ProyectosService } from '../../../../servicios/proyectos.service';

@Component({
  selector: 'app-ver-egresos',
  templateUrl: './ver-egresos.component.html',
  styleUrls: ['./ver-egresos.component.css']
})
export class VerEgresosComponent implements OnInit {
  durationInSeconds = 1000;
  egresos:any;
  egreso:any;
  proyectos:any;
  personal:any;
  datos:any;
  Modalref: NgbModalRef;
  mensaje:any;
  codusu:any;
  codegre:any;
  codpro:any;
  constructor(
    private es:EgresosService,
    private ps: ProyectosService,
    private per: PersonalService,
    private ac: ActivatedRoute,
    private router:Router,
    private modal: NgbModal,
    private location: LocationStrategy,
    private sBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  if(this.ac.snapshot.paramMap.get('codegre')){
    this.codegre = this.ac.snapshot.paramMap.get('codegre');
    this.listarEgreso(this.codegre);
  }
  this.codusu = parseInt(localStorage.getItem('codigo'));
  }
  listarEgreso(codegre:number){
    this.es.Egreso(codegre).subscribe(res=>{
      this.egreso = res;
      this.codpro = this.egreso[0].codpro;
      this.ps.listarProyecto(this.codpro).subscribe(res=>{
        this.proyectos = res;
      })
      this.per.listarPersonal(this.egreso[0].codper).subscribe(res=>{
        this.personal = res;
        console.log(this.personal)
      })
    })
  }
  eliminar(modal:any, codegre:number,codpro:number, retiro: number, edivisa:string, estado:number){
    this.datos = [{codegre, codpro, retiro, edivisa, estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  del(codegre:number){
    this.es.eliminarEgreso(codegre,this.codusu).subscribe(res => {
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
  restaurar(modal:any, codegre:number,codpro:number, retiro: number, edivisa:string,estado:number){
    this.datos = [{codegre, codpro, retiro, edivisa, estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  res(codegre:number){
    this.es.restaurarEgreso(codegre,this.codusu).subscribe(res => {
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
  confirmar(modal:any, codegre:number,codpro:number, retiro: number, edivisa:string,estado:number){
    this.datos = [{codegre, codpro, retiro, edivisa, estado }];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  conf(codegre:number){
    this.es.confirmarEgreso(codegre,this.codusu).subscribe(res => {
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
  }
}
