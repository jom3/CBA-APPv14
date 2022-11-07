import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BeneficiariosService } from '../../../../servicios/beneficiarios.service';
import { ProyectosService } from '../../../../servicios/proyectos.service';

@Component({
  selector: 'app-beneficiarios',
  templateUrl: './beneficiarios.component.html',
  styleUrls: ['./beneficiarios.component.css']
})
export class BeneficiariosComponent implements OnInit {
  Modalref: NgbModalRef;
  durationInSeconds = 1000;
  beneficiarios:any;
  codpro:number;
  codper:number;
  p: number = 1;
  datos:any;
  mensaje:any;
  proyecto:any;
  constructor(
    private ac: ActivatedRoute,
    private bs:BeneficiariosService,
    private sBar: MatSnackBar,
    private modal: NgbModal,
    private ps: ProyectosService,
    private router: Router
  ) { }
  ngOnInit(): void {
    if(parseInt(this.ac.snapshot.paramMap.get('codpro'))){
      this.codpro = parseInt(this.ac.snapshot.paramMap.get('codpro'));
      this.listarBeneficiariosbyProyecto(this.codpro);
      this.listarProyecto(this.codpro)
    }else{
      if(this.ac.snapshot.paramMap.get('codper')){
        this.codper = parseInt(this.ac.snapshot.paramMap.get('codper'));
        this.listarPostulaciones(this.codper);
      }else{
        this.listarBeneficiarios();
      }
    }
  }
  listarBeneficiarios(){
    this.bs.listarBeneficiarios().subscribe(res=>{
      this.beneficiarios = res;
    })
  }
  listarPostulaciones(codper:number){
    this.bs.listarPostulaciones(codper).subscribe(res=>{
      this.beneficiarios = res;
    })
  }
  listarBeneficiariosbyProyecto(codpro: number){
    this.bs.listarBeneficiariosbyProyecto(codpro).subscribe(res=>{
      this.beneficiarios = res;
    })
  }
  listarProyecto(codpro:number){
    this.ps.listarProyecto(codpro).subscribe(res=>{
      this.proyecto = res;
    })
  }
  deshabilitar(modal:any, codben:number, nombre:string, ap:string, am:string, titulo:string, estado:number){
    this.datos = [{codben:codben, nombre:nombre, ap:ap, am:am, titulo:titulo, estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  des(codben:number){
    this.bs.deshabilitarBeneficiario(codben).subscribe(res => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje,'',
      {
        duration: 5*this.durationInSeconds,
        horizontalPosition:"end",
        panelClass: ['snackbar']
      });
      this.listarBeneficiariosbyProyecto(this.codpro);
      this.Modalref.close();
    })
  }
  habilitar(modal:any, codben:number, nombre:string, ap:string, am:string, titulo:string, estado:number){
    this.datos = [{codben:codben, nombre:nombre, ap:ap, am:am, titulo:titulo, estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  hab(codben:number){
    this.bs.habilitarBeneficiario(codben).subscribe(res => {
      this.mensaje = res;
      this.sBar.open(this.mensaje.mensaje,'',
      {
        duration: 5*this.durationInSeconds,
        horizontalPosition:"end",
        panelClass: ['snackbar']
      });
      this.listarBeneficiariosbyProyecto(this.codpro);
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
