import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from '../../../../servicios/roles.service';
import { UsuariosService } from '../../../../servicios/usuarios.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {
  roles:any;
  rol:any;
  rolesg:any;
  durationInSeconds = 1000
  rolesusu:any;
  rolForm!:UntypedFormGroup;
  usuarios:any=[];
  codigo!:number;
  Modalref!: NgbModalRef;
  codper:number = this.ac.snapshot.params.codper
  constructor(
    private _snackBar: MatSnackBar,
    private rolService:RolesService,
    private usuService:UsuariosService,
    private fb: UntypedFormBuilder,
    private router:Router,
    private ac:ActivatedRoute){}
  ngOnInit(): void {
    this.rolForm = this.fb.group({
      codrol:['',[Validators.required]],
    });
    this.obtenerUsuario();
    this.obtenerRolesbyUsuario();
    this.obtenerRoles();
}
  obtenerUsuario(){
    this.usuService.listarUsuario(this.codper).subscribe(res=>{
      this.usuarios= res;
      this.codigo = this.usuarios[0].codrol
      this.obtenerRol(this.codigo);
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
      this.rol = this.roles[0].nombre;
    })
  }
  obtenerRolesbyUsuario(){
    this.rolService.listarRolbyUsuarios().subscribe(res=>{
      this.rolesusu = res
    })
  }
  obtenerRoles(){
    this.rolService.listarRoles().subscribe(res=>{
      this.rolesg = res;
    })
  }
  guardar(){
    var xusuario = this.rolForm.value;
    this.usuService.modificarUsuario(this.codper,xusuario).subscribe(res=>{
      this.router.navigate([`/usuarios`])
      this._snackBar.open("Rol del usuario modificado","close",{duration: 5*this.durationInSeconds,horizontalPosition:"end"});
    })
  }
  cancelar(){
    this.router.navigate(['/usuarios'])
  }
}
