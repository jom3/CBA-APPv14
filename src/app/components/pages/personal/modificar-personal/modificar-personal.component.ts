import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PersonalService } from 'src/app/servicios/personal.service';
import { RolesService } from '../../../../servicios/roles.service';

@Component({
  selector: 'app-modificar-personal',
  templateUrl: './modificar-personal.component.html',
  styleUrls: ['./modificar-personal.component.css']
})
export class ModificarPersonalComponent implements OnInit {
  roles:any=[];
  rolesg:any=[];
  durationInSeconds = 1000
  rolespel:any;
  rolForm!:UntypedFormGroup;
  personal:any=[];
  codigo!:number;
  Modalref!: NgbModalRef;
  codper:number = this.ac.snapshot.params.codper
  constructor(private _snackBar: MatSnackBar,private rolService:RolesService,private pelService:PersonalService, private fb: UntypedFormBuilder, private router:Router, private ac:ActivatedRoute){}
  ngOnInit(): void {
    this.rolForm = this.fb.group({
      codrol:['',[Validators.required]],
    });
    this.obtenerPersonal();
    this.obtenerRoles();
    this.obtenerRolesforPersonal();
}
  obtenerPersonal(){
    this.pelService.listarPersonal(this.codper).subscribe(res=>{
      this.personal = res;
      // this.obtenerRol(this.codigo);
    })
  }
  obtenerRoles(){
    this.rolService.listarRoles().subscribe(res=>{
      this.rolesg = res;
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
    }else if(this.rolForm.get(campo)?.hasError('pattern')){
      message = 'valor no valido.'
    }else if(this.rolForm.get(campo)?.hasError('min')){
      message = `el numero tiene que tener mas de 7 digitos`
    }
    return message;
  }
  obtenerRol(codrol:number){
    this.rolService.listarRol(codrol).subscribe(res=>{
      this.roles = res;
      console.log(this.roles)
    })
  }
  obtenerRolesforPersonal(){
    this.rolService.listarRolforPersonal().subscribe(res=>{
      this.rolespel = res
    })
  }
  guardar(){
    var xpersonal = this.rolForm.value;
    this.pelService.modificarPersonal(this.codper,xpersonal).subscribe(res=>{
      this.router.navigate([`/personal`])
      this._snackBar.open("Rol del personal modificado","close",{duration: 5*this.durationInSeconds,horizontalPosition:"end"});
    })
  }
  cancelar(){
    this.router.navigate(['/personal'])
  }
}
