import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TiposProyectosService } from '../../../../servicios/tipos-proyectos.service';
import { LocationStrategy } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reg-tipos',
  templateUrl: './reg-tipos.component.html',
  styleUrls: ['./reg-tipos.component.css']
})
export class RegTiposComponent implements OnInit {
  tipoForm:UntypedFormGroup;
  tipo:any;
  codtipo:number;
  durationInSeconds = 1000;
  mensaje:any;
  constructor(
    private fb:UntypedFormBuilder,
    private ac:ActivatedRoute,
    private router:Router,
    private tps:TiposProyectosService,
    private location: LocationStrategy,
    private sBar: MatSnackBar,
    ) { }
  ngOnInit(): void {
    this.tipoForm = this.fb.group({
      codtipo:[''],
      nombre:['',[Validators.required, Validators.minLength(3),Validators.maxLength(100)]],
      descripcion:['',[Validators.required, Validators.minLength(3),Validators.maxLength(255)]]
    });
    if(this.ac.snapshot.paramMap.get('codtipo')){
      this.codtipo = parseInt(this.ac.snapshot.paramMap.get('codtipo'));
      this.listarTipo(this.codtipo);
    }
  }
  listarTipo(codtipo:number){
    this.tps.listarTipo(this.codtipo).subscribe(res=>{
      this.tipo = res;
      var u = this.tipo[0]
      this.tipoForm.reset({
        codtipo:u.codtipo,
        nombre:u.nombre,
        descripcion:u.descripcion
      })
    })
  }

  getErrorMessage(campo:string){
    let message;
    if(this.tipoForm.get(campo)?.errors?.required){
      message = 'campo requerido'
    }else if(this.tipoForm.get(campo)?.hasError('minlength')){
      const minLength = this.tipoForm.get(campo)?.errors?.minlength.requiredLength;
      message = `introduzca mas de ${minLength} caracteres.`
    }else if(this.tipoForm.get(campo)?.hasError('maxlength')){
      const maxLength = this.tipoForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `introduzca menos de ${maxLength} caracteres.`
    }
    return message;
  }
  campoValido(campo:string):boolean{
    return (
      (this.tipoForm.get(campo)?.touched || this.tipoForm.get(campo)!.dirty) && !this.tipoForm.get(campo)?.valid
    );
  }
  guardar(){
    if(this.ac.snapshot.paramMap.get('codtipo')){
      const xtipo = this.tipoForm.value;
      this.tps.modificarTipo(this.codtipo,xtipo).subscribe(res=>{
        this.mensaje = res;
        this.sBar.open(this.mensaje.mensaje, '', {
          duration: 5 * this.durationInSeconds,
          horizontalPosition: 'end',
          panelClass: ['snackbar'],
        });
        this.location.back();
      })
    }else{
      const xtipo = this.tipoForm.value;
      this.tps.registrarTipo(xtipo).subscribe(res =>{
        this.mensaje = res;
        this.sBar.open(this.mensaje.mensaje, '', {
          duration: 5 * this.durationInSeconds,
          horizontalPosition: 'end',
          panelClass: ['snackbar'],
        });
        this.location.back();
      })
    }
  }
  cancelar(){
    this.location.back();
  }
}
