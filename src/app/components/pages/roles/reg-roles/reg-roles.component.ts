import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '../../../../servicios/roles.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-reg-roles',
  templateUrl: './reg-roles.component.html',
  styleUrls: ['./reg-roles.component.css']
})
export class RegRolesComponent implements OnInit {
  rol:any;
  rolForm:UntypedFormGroup;
  mensaje:any;
  codrol:number;
  constructor(
    private rs: RolesService,
    private fb: UntypedFormBuilder,
    private ac: ActivatedRoute,
    private location: LocationStrategy
  ) { }
  ngOnInit(): void {
    this.rolForm = this.fb.group({
      codrol:[''],
      tiporol:['',[Validators.required]],
      nombre:['',[Validators.required, Validators.minLength(3),Validators.maxLength(100)]],
      descripcion:['',[Validators.minLength(3),Validators.maxLength(255)]],
    });
    if(this.ac.snapshot.paramMap.get('codrol')){
      this.codrol = parseInt(this.ac.snapshot.paramMap.get('codrol'));
      this.listarRol(this.codrol);
    }
  }
  listarRol(codrol:number){
    this.rs.listarRol(codrol).subscribe(res =>{
      this.rol = res;
      const u = this.rol[0];
      this.rolForm.reset({
        codrol:u.codrol,
        nombre:u.nombre,
        tiporol:u.tiporol,
        descripcion:u.descripcion
      })
    })
  }
  getErrorMessage(campo:string){
    let message;
    if(this.rolForm.get(campo)?.errors?.required){
      message = 'campo requerido'
    }else if(this.rolForm.get(campo)?.hasError('minlength')){
      const minLength = this.rolForm.get(campo)?.errors?.minlength.requiredLength;
      message = `introduzca mas de ${minLength} caracteres.`
    }else if(this.rolForm.get(campo)?.hasError('maxlength')){
      const maxLength = this.rolForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `introduzca menos de ${maxLength} caracteres.`
    }
    return message;
  }

  campoValido(campo:string):boolean{
    return (
      (this.rolForm.get(campo)?.touched || this.rolForm.get(campo)!.dirty) && !this.rolForm.get(campo)?.valid
    );
  }
  guardar(){
    if(this.ac.snapshot.paramMap.get('codrol')){
      const xrol = this.rolForm.value;
      this.rs.modificarRol(this.codrol,xrol).subscribe(res=>{
        this.location.back();
      })
    }else{
      const xrol = this.rolForm.value;
      this.rs.registrarRol(xrol).subscribe(res =>{
        this.location.back();
      })
    }
  }
  cancelar(){
    this.location.back();
  }
}
