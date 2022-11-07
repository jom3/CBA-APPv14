import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonasService } from 'src/app/servicios/personas.service';
import { HttpClient } from '@angular/common/http';
import { Personas } from '../../../../../models/Personas';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe, LocationStrategy } from '@angular/common';
import { RolesService } from '../../../../servicios/roles.service';
@Component({
  selector: 'app-reg-personas',
  templateUrl: './reg-personas.component.html',
  styleUrls: ['./reg-personas.component.css']
})
export class RegPersonasComponent implements OnInit {
  personas:Personas[];
  perForm: UntypedFormGroup;
  mensaje:any;
  codper:number;
  data:any ='';
  rol:string;
  roles:any;
  imagen:any;
  durationInSeconds = 1000
  constructor(
    private ps:PersonasService,
    private fb: UntypedFormBuilder,
    private ac: ActivatedRoute,
    private sBar: MatSnackBar,
    private location: LocationStrategy,
    private rs: RolesService,
    private dp: DatePipe,
    ){}
  ngOnInit(): void {
      this.perForm = this.fb.group({
        codper:[''],
        nombre: ['', [Validators.minLength(3),Validators.maxLength(50),Validators.required]],
        ap:['',[Validators.minLength(3),Validators.maxLength(50)]],
        am:['',[Validators.minLength(3),Validators.maxLength(50)]],
        foto:[],
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
      this.listarPersona(this.codper);
      this.rol = localStorage.getItem('rol');
      this.obtenerRoles();
    }
  }
  listarPersona(codper:number){
    this.ps.listarPersona(codper).subscribe(res=>{
      this.data = res;
      const u = this.data[0];
      this.perForm.reset({
        nombre:u.nombre,
        ap:u.ap,
        am:u.am,
        foto:u.foto,
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
    if(this.perForm.get(campo)?.errors?.required){
      message = 'campo requerido'
    }else if(this.perForm.get(campo)?.hasError('minlength')){
      const minLength = this.perForm.get(campo)?.errors?.minlength.requiredLength;
      message = `introduzca mas de ${minLength} caracteres.`
    }else if(this.perForm.get(campo)?.hasError('maxlength')){
      const maxLength = this.perForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `introduzca menos de ${maxLength} caracteres.`
    }else if(this.perForm.get(campo)?.hasError('pattern')){
      message = 'valor no valido.'
    }
    return message;
  }
  obtenerRoles(){
    this.rs.listarRolbyUsuarios().subscribe(res=>{
      this.roles = res;
    })
  }
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imagen = file;
    }
  }
  guardar(){
    if(this.ac.snapshot.paramMap.get('codper')){
      const xpersona = new FormData();
      const fe = this.perForm.controls.fnac.value;
      xpersona.append('nombre', this.perForm.get('nombre').value);
      xpersona.append('am', this.perForm.get('am').value);
      xpersona.append('ap', this.perForm.get('ap').value);
      xpersona.append('foto', this.imagen);
      xpersona.append('fnac', this.dp.transform(this.perForm.get('fnac').value,"dd-MM-yyyy"));
      xpersona.append('ci', this.perForm.get('ci').value);
      xpersona.append('expedido', this.perForm.get('expedido').value);
      xpersona.append('direccion', this.perForm.get('direccion').value);
      xpersona.append('email', this.perForm.get('email').value);
      xpersona.append('telefono', this.perForm.get('telefono').value);
        this.ps.modificarPersona(this.codper,xpersona).subscribe(res=>{
          this.location.back();
          this.mensaje = res;
          this.sBar.open(this.mensaje.mensaje,'',
          {
            duration: 5*this.durationInSeconds,
            horizontalPosition:"end",
            panelClass: ['snackbar']
          });
        })
    }
}
  volver(){
    this.location.back();
  }
}
