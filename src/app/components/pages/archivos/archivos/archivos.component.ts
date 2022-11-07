import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { ArchivosService } from '../../../../servicios/archivos.service';
import { ProyectosService } from '../../../../servicios/proyectos.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {
  archivos!:any;
  filtroArchivos = '';
  durationInSeconds = 1000;
  arcForm!:UntypedFormGroup;
  codpro = this.ac.snapshot.params.codpro;
  p: number = 1;
  datos!:any;
  mensaje!:any;
  Modalref!: NgbModalRef;
  codper:number;
  proyecto:any;
  constructor(
    private router: Router,
    private ac: ActivatedRoute,
    private location: LocationStrategy,
    private as: ArchivosService,
    private pr: ProyectosService,
    private fb: UntypedFormBuilder,
    private sBar: MatSnackBar,
    private modal: NgbModal,
    private ps:ProyectosService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('codigo')){
      this.codper = parseInt(localStorage.getItem('codigo'));
    }
    if(this.ac.snapshot.paramMap.get('codpro')){
      this.codpro = parseInt(this.ac.snapshot.paramMap.get('codpro'));
      this.listarArchivosbyProyecto(this.codpro);
      this.listarProyecto(this.codpro);
    }else{
      this.listarArchivos();
    }
    this.arcForm = this.fb.group({
      codarc:[''],
      codpro:[this.codpro],
      archivo:['', Validators.required],
      nombre:['',[Validators.required, Validators.minLength(3),Validators.maxLength(100)]],
      descripcion:['',[Validators.required, Validators.minLength(3),Validators.maxLength(255)]],
      fsubida:['',[Validators.required]]
    })
  }
  listarArchivos(){
    this.as.listarArchivos().subscribe(res=>{
      this.archivos= res;
    });
  }
  listarProyecto(codpro:number){
    this.ps.listarProyecto(codpro).subscribe(res=>{
      this.proyecto = res;
    })
  }
  listarArchivosbyProyecto(codpro:number){
    this.as.listarArchivosbyProyecto(codpro).subscribe(res=>{
      this.archivos=res;
    })
  }
  registrarNuevo(){
    this.router.navigate([`/archivos/registrarArchivo/${this.codpro}`])
  }
  eliminar(modal:any, codarc:number,nombre:string,descripcion:string,estado:number){
    this.datos = [{codarc:codarc,nombre:nombre,descripcion:descripcion,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  del(codarc:number){
    this.as.eliminarArchivo(codarc, this.codper).subscribe(res => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje,'',
      {
        duration: 5*this.durationInSeconds,
        horizontalPosition:"end",
        panelClass: ['snackbar']
      });
      this.listarArchivosbyProyecto(this.codpro)
      this.Modalref.close();
    })
  }
  bloquear(modal:any, codarc:number,nombre:string,descripcion:string,estado:number){
    this.datos = [{codarc:codarc,nombre:nombre,descripcion:descripcion,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  bloq(codarc:number){
    this.as.bloquearArchivo(codarc, this.codper).subscribe(res => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje,'',
      {
        duration: 5*this.durationInSeconds,
        horizontalPosition:"end",
        panelClass: ['snackbar']
      });
      this.listarArchivosbyProyecto(this.codpro)
      this.Modalref.close();
    })
  }
  cancelar(){
    this.Modalref.close();
  }
  verProyecto(){
    this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);
  }
}
