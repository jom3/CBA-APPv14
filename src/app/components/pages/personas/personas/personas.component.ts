import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PersonasService } from '../../../../servicios/personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  personas:any=[];
  filtroPersonas = '';
  submitted = false;
  Modalref!: NgbModalRef;
  perForm!: UntypedFormGroup;
  p: number = 1;
  constructor(private perService:PersonasService, private fb: UntypedFormBuilder, private router:Router){}
  ngOnInit(): void {
    this.perForm = this.fb.group({
      codper:[''],
      nombre: [''],
      ap:[''],
      am:[''],
      foto:[''],
      fnac:[],
      ci:[],
      direccion:[''],
      email:[''],
      telefono:[''],
      estado:['']
    })
    this.listarPersonas();
  }
  registrarNuevo(){
    this.router.navigate(['/personas/registrarPersona'])
  }
  listarPersonas(){
    this.perService.listarPersonas().subscribe(resp =>{
      this.personas = resp;
      })
  }

  // registrarPersona
  // registrarPersona(modal: any) {
  //   this.perForm.reset();
  //   this.Modalref = this.modal.open(modal,{ centered: true });
  //   }

  // regPersona(){
  //   this.submitted = true;
  //   if(this.perForm.invalid){
  //     return;
  //   }
  //   const xpersona = this.perForm.value;
  //   this.perService.registrarPersona(xpersona).subscribe(res =>{
  //     this.router.navigate(['/personas']);
  //     this.listarPersonas();
  //     this.Modalref.close();
  //   })
  //   }

  //   // modificar persona
  //   modificarPersona(modal: any,codper:number,nombre:string,ap:string,am:string,foto:string,fnac:Date,ci:number,direccion:string,email:string,telefono:number) {
  //     this.perForm.reset({codper:codper,nombre:nombre, ap:ap,am:am,foto:foto,fnac:fnac,ci:ci,direccion:direccion,email:email,telefono:telefono})
  //     this.Modalref = this.modal.open(modal,{ centered: true });
  //     }

  //   modPersona(){
  //     this.submitted = true;
  //     if(this.perForm.invalid){
  //       return;
  //     }
  //     const xpersona = this.perForm.value;
  //     const xcodper = this.perForm.controls.codper.value;
  //     console.log(xcodper);
  //     this.perService.modificarPersona(xcodper,xpersona).subscribe(res =>{
  //       this.router.navigate(['/personas']);
  //       this.listarPersonas();
  //       this.Modalref.close();
  //     })
  //     }
  //     verPersona(modal: any,codper:number,nombre:string,ap:string,am:string,foto:string,fnac:Date,ci:number,direccion:string,email:string,telefono:number,estado:number) {
  //       this.datos = [{codper:codper,nombre:nombre, ap:ap,am:am,foto:foto,fnac:fnac,ci:ci,direccion:direccion,email:email,telefono:telefono, estado:estado}];
  //       this.Modalref = this.modal.open(modal,{ centered: true });
  //       }
  //     eliminar(modal:any, codper:number,nombre:string,ap:string,am:string){
  //       this.datos = [{codper:codper,nombre:nombre, ap:ap,am:am}];
  //       this.Modalref.close();
  //       this.Modalref = this.modal.open(modal,{ centered: true });
  //     }
  //     del(codper:number){
  //       this.perService.eliminarPersona(codper).subscribe(res=>{
  //         this.listarPersonas();
  //       })
  //       this.Modalref.close();
  //     }
  //     cancelar(){
  //       this.Modalref.close();
  //     }

  //     restaurar(modal:any, codper:number,nombre:string,ap:string,am:string){
  //       this.datos = [{codper:codper,nombre:nombre, ap:ap,am:am}];
  //       this.Modalref.close();
  //       this.Modalref = this.modal.open(modal,{ centered: true });
  //     }
  //     res(codper:number){
  //       this.perService.restaurarPersona(codper).subscribe(res=>{
  //         this.listarPersonas();
  //       })
  //       this.Modalref.close();
  //     }
}


