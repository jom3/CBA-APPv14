import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../../../servicios/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-reg-logeo',
  templateUrl: './reg-logeo.component.html',
  styleUrls: ['./reg-logeo.component.css']
})
export class RegLogeoComponent implements OnInit {
  results!:any;
  logForm!:UntypedFormGroup;

  constructor(
    private fb:UntypedFormBuilder,
    private daService:UsuariosService,
    private Ac: ActivatedRoute,
    private router:Router,
    private location:LocationStrategy
    ) { }

  ngOnInit(): void {
    this.logForm = this.fb.group({
      usuario:['',[Validators.required]],
      contraseña:['',[Validators.required]],
      contraseña2:['',[Validators.required]]
    })
  }
  getErrorMessage(campo:string){
    let message;
    if(this.logForm.get(campo)?.errors?.required){
      message = 'campo requerido'
    }else if(this.logForm.get(campo)?.hasError('minlength')){
      const minLength = this.logForm.get(campo)?.errors?.minlength.requiredLength;
      message = `introduzca mas de ${minLength} caracteres.`
    }else if(this.logForm.get(campo)?.hasError('maxlength')){
      const maxLength = this.logForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `introduzca menos de ${maxLength} caracteres.`
    }else if(this.logForm.get(campo)?.hasError('pattern')){
      message = 'valor no valido.'
    }else if(this.logForm.get(campo)?.hasError('min')){
      message = `el numero tiene que tener mas de 7 digitos`
    }else if(this.validarContraseña() == false){
      message = 'la contraseñas son diferentes'
    }
    return message;
  }
  validarContraseña(){
    if(this.logForm.controls.contraseña.value != this.logForm.controls.contraseña2.value){
      return false;
    }else{
      return true;
    }
  }

  campoValido(campo:string):boolean{
    return (
      (this.logForm.get(campo)?.touched || this.logForm.get(campo)!.dirty) && !this.logForm.get(campo)?.valid
    );
  }
  guardar(){
    if(this.validarContraseña() == false){
      console.log('las contraseñas no son iguales')
    }else{
      const usuario = this.logForm.controls.usuario.value;
      const contraseña = this.logForm.controls.contraseña.value;
      console.log(usuario,contraseña)
      const codper = this.Ac.snapshot.params.codper

      this.daService.registrarDatos(codper,usuario,contraseña).subscribe(res=>{
        this.results = res;
        this.router.navigate(['/proyectos'])
      })
    }
  }
}
