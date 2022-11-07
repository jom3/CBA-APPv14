import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from '../../../../servicios/proveedores.service';
import { InstitucionesService } from '../../../../servicios/instituciones.service';
import { LocationStrategy } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reg-proveedores',
  templateUrl: './reg-proveedores.component.html',
  styleUrls: ['./reg-proveedores.component.css']
})
export class RegProveedoresComponent implements OnInit {
  durationInSeconds = 1000;
  proveedores:any;
  instituciones:any;
  provForm:UntypedFormGroup;
  mensaje:any;
  codprov:number;
  constructor(
    private ps: ProveedoresService,
    private is: InstitucionesService,
    private fb: UntypedFormBuilder,
    private router:Router,
    private ac: ActivatedRoute,
    private location:LocationStrategy,
    private sBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.provForm = this.fb.group({
      codprov:[''],
      codi:['', [Validators.required]],
    });
    this.listarInstituciones();
    if(this.ac.snapshot.paramMap.get('codprov')){
      this.codprov = parseInt(this.ac.snapshot.paramMap.get('codprov'));
      this.listarProveedor(this.codprov);
    }
  }
  listarProveedor(codprov: number){
    this.ps.listarProveedor(codprov).subscribe(res =>{
      this.proveedores = res;
      const u = this.proveedores[0];
      this.provForm.reset({
        codprov:u.codprov,
        nombre:u.nombre,
        descripcion:u.descripcion,
        direccion:u.direccion,
        email:u.email,
        telefono:u.telefono
      })
    })
  }
  listarInstituciones(){
    this.is.listarInstitucionesActivas().subscribe(res=>{
      this.instituciones=res;
    })
  }
  getErrorMessage(campo:string){
    let message;
    if(this.provForm.get(campo)?.errors?.required){
      message = 'campo requerido'
    }
    return message;
  }

  campoValido(campo:string):boolean{
    return (
      (this.provForm.get(campo)?.touched || this.provForm.get(campo)!.dirty) && !this.provForm.get(campo)?.valid
    );
  }
  guardar(){
    if(this.ac.snapshot.paramMap.get('codprov')){
      const xproveedor = this.provForm.value;
      this.ps.modificarProveedor(this.codprov,xproveedor).subscribe(res=>{
        this.mensaje = res;
        this.sBar.open(this.mensaje.mensaje, '', {
          duration: 5 * this.durationInSeconds,
          horizontalPosition: 'end',
          panelClass: ['snackbar'],
        });
      this.location.back();
      })
    }else{
      const xproveedor = this.provForm.value;
      this.ps.registrarProveedor(xproveedor).subscribe(res =>{
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
