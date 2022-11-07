import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Personas } from 'src/models/Personas';
import { RolesService } from '../../../servicios/roles.service';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { DatePipe, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-reg-usuario',
  templateUrl: './reg-usuario.component.html',
  styleUrls: ['./reg-usuario.component.css']
})
export class RegUsuarioComponent implements OnInit {
  durationInSeconds = 1000
  roles:any;
  Usuarios:Personas[];
  usuForm:UntypedFormGroup;
  mensaje:any;
  codper: number;
  data:any;
  imagen:any;
  constructor(
    private us:UsuariosService,
    private fb: UntypedFormBuilder,
    private router:Router,
    private ac: ActivatedRoute,
    private rolService:RolesService,
    private sBar: MatSnackBar,
    private dp: DatePipe,
    private location: LocationStrategy
    ){}
  ngOnInit(): void {
    this.usuForm = this.fb.group({
    codper:[''],
    nombre: ['', [Validators.minLength(3),Validators.maxLength(50),Validators.required]],
    ap:['',[Validators.minLength(3),Validators.maxLength(50)]],
    am:['',[Validators.minLength(3),Validators.maxLength(50)]],
    foto:[],
    codrol:['',[Validators.required]],
    fnac:['',[Validators.required]],
    ci:['',[Validators.required,Validators.minLength(7),Validators.maxLength(9)]],
    expedido:['',[Validators.required]],
    direccion:['',[Validators.minLength(3),Validators.maxLength(255),Validators.required]],
    email:['',[Validators.minLength(3),Validators.maxLength(50),Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      //google - "^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$"
      //"^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
    telefono:['',[Validators.required,Validators.minLength(7),Validators.maxLength(9)]],
  })
      if(this.ac.snapshot.paramMap.get('codper')){
        this.codper = parseInt(this.ac.snapshot.paramMap.get('codper'));
        this.listarUsuario(this.codper);
      }
    this.obtenerRoles();
  }
  listarUsuario(codper){
    this.us.listarUsuario(codper).subscribe(res=>{
      this.data = res;
      const u = this.data[0];
      this.usuForm.reset({
        nombre:u.nombre,
        ap:u.ap,
        am:u.am,
        codrol:u.codrol,
        fnac:u.fnac,
        ci:u.ci,
        expedido:u.expedido,
        direccion:u.direccion,
        email:u.email,
        telefono:u.telefono
      })
    })
  }
  getErrorMessage(campo:string){
    let message;
    if(this.usuForm.get(campo)?.errors?.required){
      message = 'campo requerido'
    }else if(this.usuForm.get(campo)?.hasError('minlength')){
      const minLength = this.usuForm.get(campo)?.errors?.minlength.requiredLength;
      message = `introduzca mas de ${minLength} caracteres.`
    }else if(this.usuForm.get(campo)?.hasError('maxlength')){
      const maxLength = this.usuForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `introduzca menos de ${maxLength} caracteres.`
    }else if(this.usuForm.get(campo)?.hasError('pattern')){
      message = 'valor no valido.'
    }
    return message;
  }
  obtenerRoles(){
    this.rolService.listarRolbyUsuarios().subscribe(res=>{
      this.roles = res;
    })
  }
  campoValido(campo:string):boolean{
    return (
      (this.usuForm.get(campo)?.touched || this.usuForm.get(campo)!.dirty) && !this.usuForm.get(campo)?.valid
      );
    }
    selectImage(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.imagen = file;
      }
    }
    guardar(){
      if(this.ac.snapshot.params.codper){
        const xusuario = this.usuForm.value;
        this.us.modificarUsuario(this.codper,xusuario).subscribe(res=>{
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
        const xusuario = new FormData();
        const fe = this.usuForm.controls.fnac.value;
        xusuario.append('nombre', this.usuForm.get('nombre').value);
        xusuario.append('am', this.usuForm.get('am').value);
        xusuario.append('ap', this.usuForm.get('ap').value);
        xusuario.append('foto', this.imagen);
        xusuario.append('codrol', this.usuForm.get('codrol').value);
        xusuario.append('fnac', this.dp.transform(this.usuForm.get('fnac').value,"dd-MM-yyyy"));
        xusuario.append('ci', this.usuForm.get('ci').value);
        xusuario.append('expedido', this.usuForm.get('expedido').value);
        xusuario.append('direccion', this.usuForm.get('direccion').value);
        xusuario.append('email', this.usuForm.get('email').value);
        xusuario.append('telefono', this.usuForm.get('telefono').value);
        this.us.registrarUsuario(xusuario).subscribe(res =>{
          this.mensaje = res;
          this.sBar.open(this.mensaje.mensaje,'',
          {
            duration: 5*this.durationInSeconds,
            horizontalPosition:"end",
            panelClass: ['snackbar']
          });
          this.router.navigate(['/login']);
        })
      }
    }
  cancelar(){
    this.location.back();
  }
}
