import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CambioService } from '../../../servicios/cambio.service';
import { LoginService } from '../../../servicios/login.service';
import { RolesService } from '../../../servicios/roles.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  durationInSeconds = 1000;
  rol:any;
  data:any;
  logForm!: UntypedFormGroup;
  constructor(
    private _snackBar: MatSnackBar,
    private log:LoginService,
    private fb: UntypedFormBuilder,
    private router:Router,
    private rs: RolesService
    ) { }

  ngOnInit(): void {
    this.logForm = this.fb.group({
      usuario:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      contraseña:['', [Validators.required]]
    })
  }
  getErrorMessage(campo:string){
    let message;
    if(this.logForm.get(campo)?.errors?.required){
      message = 'campo requerido'
    }else if(this.logForm.get(campo)?.hasError('pattern')){
      message = 'correo no valido.'
    }
    return message;
  }

  campoValido(campo:string):boolean{
    return (
      (this.logForm.get(campo)?.touched || this.logForm.get(campo)!.dirty) && !this.logForm.get(campo)?.valid
    );
  }
  iniciarSesion(){
      const xlogin = this.logForm.value;
      this.log.Autentificar(xlogin).subscribe(res=>{
        this.data = res;
        if(this.data!=null){
          const token = this.data.token;
          const codigo = this.data.codigo;
          localStorage.setItem('token',token);
          localStorage.setItem('codigo',JSON.stringify(codigo));
          this.router.navigate([`/proyectos`])
          this.rs.obtenerRol(codigo).subscribe(res=>{
            this.rol = res;
            localStorage.setItem('rol',this.rol.nombre);
            location.reload();
          })
        }else{
            this.logForm.reset({usuario:'',contraseña:''});
            this._snackBar.open("No existe el usuario","close",{duration: 5*this.durationInSeconds,horizontalPosition:"end"});
          }
      }
      );
  }
}
