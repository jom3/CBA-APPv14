import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../servicios/login.service';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.component.html',
  styleUrls: ['./recuperacion.component.css']
})
export class RecuperacionComponent implements OnInit {
  durationInSeconds = 1000
  mensaje:any;
  recForm:UntypedFormGroup;

  constructor(
    private fb:UntypedFormBuilder,
    private ls: LoginService,
    private location:LocationStrategy,
    private sBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.recForm = this.fb.group({
      email:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    })
  }
  getErrorMessage(campo:string){
    let message;
    if(this.recForm.get(campo)?.errors?.required){
      message = 'campo requerido'
    }else if(this.recForm.get(campo)?.hasError('pattern')){
      message = 'correo no valido'
    }
    return message;
  }
  campoValido(campo:string):boolean{
    return (
      (this.recForm.get(campo)?.touched || this.recForm.get(campo)!.dirty) && !this.recForm.get(campo)?.valid
    );
  }
  recuperar(){
      const email = this.recForm.controls.email.value;
      this.ls.recuperar(email).subscribe(res=>{
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
