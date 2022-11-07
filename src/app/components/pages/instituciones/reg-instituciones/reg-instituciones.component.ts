import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { InstitucionesService } from '../../../../servicios/instituciones.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-reg-instituciones',
  templateUrl: './reg-instituciones.component.html',
  styleUrls: ['./reg-instituciones.component.css']
})
export class RegInstitucionesComponent implements OnInit {
  durationInSeconds = 1000;
  instituciones:any;
  instForm!:UntypedFormGroup;
  mensaje:any;
  codi:number;
  constructor(
    private is: InstitucionesService,
    private fb: UntypedFormBuilder,
    private ac: ActivatedRoute,
    private sBar: MatSnackBar,
    private location: LocationStrategy
    ) { }

  ngOnInit(): void {
    this.instForm = this.fb.group({
      codi:[''],
      nombre:['',[Validators.required, Validators.minLength(3),Validators.maxLength(100)]],
      tipo:['', [Validators.required]],
      descripcion:['',[Validators.required, Validators.minLength(3),Validators.maxLength(255)]],
      direccion:['',[Validators.minLength(3),Validators.maxLength(255),Validators.required]],
      //HACK: ^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$ patron solo para gmail
      email:['',[Validators.minLength(3),Validators.maxLength(50),Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      telefono:['',[Validators.required,Validators.minLength(7),Validators.maxLength(9)]]
    });
    if(this.ac.snapshot.paramMap.get('codi')){
      this.codi = parseInt(this.ac.snapshot.paramMap.get('codi'));
      this.listarInstitucion(this.codi);
    }
  }
  listarInstitucion(codi: number){
    this.is.listarInstitucion(codi).subscribe(res =>{
      this.instituciones = res;
      const u = this.instituciones[0];
      this.instForm.reset({
        codi:u.codi,
        nombre:u.nombre,
        tipo:u.tipo_i,
        descripcion:u.descripcion,
        direccion:u.direccion,
        email:u.email,
        telefono:u.telefono
      })
    })
  }
  getErrorMessage(campo:string){
    let message;
    if(this.instForm.get(campo)?.errors?.required){
      message = 'campo requerido'
    }else if(this.instForm.get(campo)?.hasError('minlength')){
      const minLength = this.instForm.get(campo)?.errors?.minlength.requiredLength;
      message = `introduzca mas de ${minLength} caracteres.`
    }else if(this.instForm.get(campo)?.hasError('maxlength')){
      const maxLength = this.instForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `introduzca menos de ${maxLength} caracteres.`
    }else if(this.instForm.get(campo)?.hasError('pattern')){
      message = 'valor no valido.'
    }
    return message;
  }
  campoValido(campo:string):boolean{
    return (
      (this.instForm.get(campo)?.touched || this.instForm.get(campo)!.dirty) && !this.instForm.get(campo)?.valid
    );
  }
  guardar(){
    if(this.ac.snapshot.paramMap.get('codi')){
      const xinstitucion = this.instForm.value;
      this.is.modificarInstitucion(this.codi,xinstitucion).subscribe(res=>{
        this.mensaje = res;
          this.sBar.open(this.mensaje.mensaje,'',
          {
            duration: 5*this.durationInSeconds,
            horizontalPosition:"end",
            panelClass: ['snackbar']
          });
          this.location.back();
      })
    }else{
      const xinstitucion = this.instForm.value;
      this.is.registrarInstitucion(xinstitucion).subscribe(res =>{
        this.mensaje = res;
          this.sBar.open(this.mensaje.mensaje,'',
          {
            duration: 5*this.durationInSeconds,
            horizontalPosition:"end",
            panelClass: ['snackbar']
          });
          this.location.back();
      })
    }
  }
  cancelar(){
    this.location.back();
  }
}
