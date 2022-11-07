import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from 'src/app/servicios/roles.service';
import { Personas } from 'src/models/Personas';
import { PersonalService } from '../../../../servicios/personal.service';
import { DatePipe, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-reg-personal',
  templateUrl: './reg-personal.component.html',
  styleUrls: ['./reg-personal.component.css']
})
export class RegPersonalComponent implements OnInit {
  durationInSeconds = 1000;
  codigo: any;
  mensaje:any;
  roles:any;
  Personal:Personas[];
  pelForm: UntypedFormGroup;
  codper:number;
  data:any;
  imagen: any;

  constructor(
    private ps:PersonalService,
    private fb: UntypedFormBuilder,
    private ac: ActivatedRoute,
    private rs:RolesService,
    private sBar: MatSnackBar,
    private location: LocationStrategy,
    private dp: DatePipe
    ){}
  ngOnInit(): void {
      this.pelForm = this.fb.group({
      codper:[''],
      nombre: ['', [Validators.minLength(3),Validators.maxLength(50),Validators.required]],
      ap:['',[Validators.minLength(3),Validators.maxLength(50),Validators.required]],
      am:['',[Validators.minLength(3),Validators.maxLength(50),Validators.required]],
      foto:[''],
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
      this.listarPersonal(this.codper);
    }
    this.obtenerRoles();
  }
  listarPersonal(codper:number){
    this.ps.listarPersonal(codper).subscribe(res=>{
      this.data = res;
      const u = this.data[0];
    this.pelForm.reset({
      nombre:u.nombre,
      ap:u.ap,
      am:u.am,
      foto:u.foto,
      fnac:u.fnac,
      ci:u.ci,
      expedido:u.expedido,
      direccion:u.direccion,
      email:u.email,
      telefono:u.telefono,
      codrol:u.codrol
    });
      this.listarRol(u.codrol)
    })
  }
  listarRol(codrol:number){
    this.rs.listarRol(codrol).subscribe(res=>{
      this.roles =res;
    })
  }
  getErrorMessage(campo:string){
    let message;
    if(this.pelForm.get(campo)?.errors?.required){
      message = 'campo requerido'
    }else if(this.pelForm.get(campo)?.hasError('minlength')){
      const minLength = this.pelForm.get(campo)?.errors?.minlength.requiredLength;
      message = `introduzca mas de ${minLength} caracteres.`
    }else if(this.pelForm.get(campo)?.hasError('maxlength')){
      const maxLength = this.pelForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `introduzca menos de ${maxLength} caracteres.`
    }else if(this.pelForm.get(campo)?.hasError('pattern')){
      message = 'valor no valido.'
    }
    return message;
  }
  obtenerRoles(){
    this.rs.listarRolforPersonal().subscribe(res=>{
      this.roles = res;
    })
  }
  campoValido(campo:string):boolean{
    return (
      (this.pelForm.get(campo)?.touched || this.pelForm.get(campo)!.dirty) && !this.pelForm.get(campo)?.valid
    );
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imagen = file;
    }
  }

  guardar(){
    if(this.ac.snapshot.paramMap.get('codper')){
      const xpersonal = this.pelForm.value;
      this.ps.modificarPersonal(this.codper,xpersonal).subscribe(res=>{
        this.mensaje = res;
          this.sBar.open(this.mensaje.mensaje,'',
          {
            duration: 5*this.durationInSeconds,
            horizontalPosition:"end",
            panelClass: ['snackbar']
          });
          this.location.back();
      });
    }else{
        const xpersonal = new FormData();
        const fe = this.pelForm.controls.fnac.value;
        xpersonal.append('nombre', this.pelForm.get('nombre').value);
        xpersonal.append('am', this.pelForm.get('am').value);
        xpersonal.append('ap', this.pelForm.get('ap').value);
        xpersonal.append('foto', this.imagen);
        xpersonal.append('codrol', this.pelForm.get('codrol').value);
        xpersonal.append('fnac', this.dp.transform(this.pelForm.get('fnac').value,"dd-MM-yyyy"));
        xpersonal.append('ci', this.pelForm.get('ci').value);
        xpersonal.append('expedido', this.pelForm.get('expedido').value);
        xpersonal.append('direccion', this.pelForm.get('direccion').value);
        xpersonal.append('email', this.pelForm.get('email').value);
        xpersonal.append('telefono', this.pelForm.get('telefono').value);
        this.ps.registrarPersonal(xpersonal).subscribe(res =>{
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
