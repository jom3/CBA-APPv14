import { Component, Inject, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TareasService } from '../../../../servicios/tareas.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MiembrosService } from '../../../../servicios/miembros.service';
import { RolesService } from '../../../../servicios/roles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProyectosService } from '../../../../servicios/proyectos.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css'],
})
export class TareasComponent implements OnInit {
  durationInSeconds = 1000;
  tareas: any;
  proyecto: any;
  tsForm: UntypedFormGroup;
  codpro: number;
  codmiem: number;
  codper: number;
  p: number = 1;
  Modalref!: NgbModalRef;
  datos: any = [];
  mensaje: any;
  rol: any;
  roleq: any;
  rolper: any;
  statuse: boolean = false;
  status:any;
  constructor(
    private ac: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private location: LocationStrategy,
    private router: Router,
    private ts: TareasService,
    private modal: NgbModal,
    private ms: MiembrosService,
    private sBar: MatSnackBar,
    private rs: RolesService,
    private ps: ProyectosService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('codigo')) {
      this.codper = parseInt(localStorage.getItem('codigo'));
    }
    if(this.ac.snapshot.paramMap.get('codpro')){
      this.codpro = parseInt(this.ac.snapshot.paramMap.get('codpro'));
    }
    if (this.ac.snapshot.paramMap.get('codmiem')) {
      this.codmiem = parseInt(this.ac.snapshot.paramMap.get('codmiem'));
      this.listarTareasbyPersonal(this.codmiem);
    } else if (this.codpro) {
      this.listarProyecto(this.codpro);
      this.listarTareasbyProyecto(this.codpro);
      this.listarRolProyecto(this.codper, this.codpro);
    }else if (this.codper) {
      this.listarTareasbyCodigo(this.codper);
      this.statuse = true;
    } else {
      this.listarTareas();
    }
  }
  registrarNuevo() {
    this.router.navigate([`/tareas/registrarTarea/${this.codpro}`]);
  }
  listarProyecto(codpro: number) {
    this.ps.listarProyecto(codpro).subscribe((res) => {
      this.proyecto = res;
      this.status = this.proyecto[0].estado;
    });
  }
  listarRolProyecto(codper: number, codpro: number) {
    this.rs.listarRolProyecto(codper, codpro).subscribe((res) => {
      this.roleq = res;
      this.rolper = this.roleq[0].nomrol;
    });
  }
  listarTareas() {
    this.ts.listarTareas().subscribe((res) => {
      this.tareas = res;
    });
  }
  listarTareasbyCodigo(codper: number) {
    this.ts.listarTareasbyCodigo(codper).subscribe((res) => {
      this.tareas = res;
    });
  }
  listarTareasbyProyecto(codpro: number) {
    this.ts.listarTareasbyProyecto(codpro).subscribe((res) => {
      this.tareas = res;
    });
  }
  listarTareasbyPersonal(codmiem: number) {
    this.ts.listarTareasbyProyecto(codmiem).subscribe((res) => {
      this.tareas = res;
    });
  }
  eliminar(modal: any, codt: number, nomta: string, estado: number) {
    this.datos = [{ codt: codt, nombre: nomta, estado: estado }];
    this.Modalref = this.modal.open(modal, { centered: true, size: 'sm' });
  }
  del(codt: number) {
    this.ts.eliminarTarea(codt, this.codper).subscribe((res) => {
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
  restaurar(modal: any, codt: number, nomta: string, estado: number) {
    this.datos = [{ codt: codt, nombre: nomta, estado: estado }];
    this.Modalref = this.modal.open(modal, { centered: true, size: 'sm' });
  }
  res(codt: number) {
    this.ts.restaurarTarea(codt, this.codper).subscribe((res) => {
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
  completar(modal: any, codt: number, nomta: string, estado: number) {
    this.datos = [{ codt: codt, nombre: nomta, estado: estado }];
    this.Modalref = this.modal.open(modal, { centered: true, size: 'sm' });
  }
  com(codt: number) {
    this.ts.completarTarea(codt, this.codper).subscribe((res) => {
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
  verProyecto() {
    this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);
  }
  historial(codt:number) {
    const dialogRef = this.dialog.open(HistorialDialog,{
      data:codt
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  verInforme(){
    console.log(this.codpro)
    this.router.navigate([`/informes/tareas/${this.codpro}`])
  }
}

@Component({
  selector: 'historial-dialog',
  templateUrl: 'historial-dialog.html',
})
export class HistorialDialog implements OnInit{
  historial:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ts:TareasService,
    private ps:ProyectosService,
    ){
  }

  ngOnInit(): void {
      this.ts.listarHistorial(this.data).subscribe(res=>{
        this.historial = res;
      })
  }
}
