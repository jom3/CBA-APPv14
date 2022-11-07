import { Component, Inject, OnInit } from '@angular/core';
import { PersonasService } from '../../../../servicios/personas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-ver-personas',
  templateUrl: './ver-personas.component.html',
  styleUrls: ['./ver-personas.component.css']
})

export class VerPersonasComponent implements OnInit {
  mensaje:any;
  Modalref!: NgbModalRef;
  personas:any;
  datos:any;
  codper:number;
  constructor(
    private ps:PersonasService,
    private router:Router,
    private ac:ActivatedRoute,
    private modal: NgbModal,
    private location:LocationStrategy
  ){}
  ngOnInit(): void {
    if(this.ac.snapshot.paramMap.get('codper')){
      this.codper = parseInt(this.ac.snapshot.paramMap.get('codper'));
      this.listarPersona(this.codper);
    }
  }
  listarPersona(codper:number){
    this.ps.listarPersona(codper).subscribe(res =>{
      this.personas = res;
      })
  }
  eliminar(modal:any, codper:number,nombre:string,ap:string,am:string,estado:number){
    this.datos = [{codper:codper,nombre:nombre, ap:ap,am:am ,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  del(codper:number){
    this.ps.eliminarPersona(codper).subscribe(res => {
      this.mensaje = res;
      this.router.navigate(['/personas']);
      this.Modalref.close();
    })
  }
  restaurar(modal:any, codper:number,nombre:string,ap:string,am:string,estado:number){
    this.datos = [{codper:codper,nombre:nombre, ap:ap,am:am ,estado:estado}];
    this.Modalref = this.modal.open(modal,{ centered: true, size: 'sm'});
  }
  res(codper:number){
    this.ps.restaurarPersona(codper).subscribe(res => {
      this.mensaje = res;
      this.router.navigate(['/personas']);
      this.Modalref.close();
    })
  }
  cancelar(): void {
    this.location.back();
  }

  volver(){
    this.router.navigate([`/personas`])
  }
}
