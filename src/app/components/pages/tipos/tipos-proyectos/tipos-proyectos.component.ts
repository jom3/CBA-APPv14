import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TiposProyectosService } from '../../../../servicios/tipos-proyectos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipos-proyectos',
  templateUrl: './tipos-proyectos.component.html',
  styleUrls: ['./tipos-proyectos.component.css']
})
export class TiposProyectosComponent implements OnInit {
  tipos:any;
  filtroTipos = '';
  durationInSeconds = 1000;
  Modalref!: NgbModalRef;
  datos:any;
  p: number = 1;
  mensaje:any;
  constructor(
    private modal: NgbModal,
    private tps:TiposProyectosService,
    private router:Router,
    private sBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.listarTipos();
  }
  listarTipos(){
    this.tps.listarTipos().subscribe(res=>{
      this.tipos = res;
    })
  }
  registrarNuevo(){
    this.router.navigate(['/tiposProyectos/registrarTipo']);
  }
  eliminar(modal:any, codtipo:number,nombre:string,descripcion:string,estado:number){
    this.datos = [{codtipo:codtipo,nombre:nombre, descripcion:descripcion,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  del(codtipo:number){
    this.tps.eliminarTipo(codtipo).subscribe(res => {
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
  restaurar(modal:any, codtipo:number,nombre:string,descripcion:string,estado:number){
    this.datos = [{codtipo:codtipo,nombre:nombre, descripcion:descripcion,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  res(codtipo:number){
    this.tps.restaurarTipo(codtipo).subscribe(res => {
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
