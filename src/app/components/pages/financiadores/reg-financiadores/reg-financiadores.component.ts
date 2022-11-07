import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { PersonasService } from '../../../../servicios/personas.service';
import { InstitucionesService } from '../../../../servicios/instituciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanciadoresService } from '../../../../servicios/financiadores.service';
import { LocationStrategy } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reg-financiadores',
  templateUrl: './reg-financiadores.component.html',
  styleUrls: ['./reg-financiadores.component.css']
})
export class RegFinanciadoresComponent implements OnInit {
  durationInSeconds = 1000;
  respons:any;
  financiador:any;
  personas:any;
  instituciones:any;
  FinForm:UntypedFormGroup;
  codf:number;
  mensaje:any;
  constructor(
    private fb: UntypedFormBuilder,
    private ps:PersonasService,
    private is:InstitucionesService,
    private ac:ActivatedRoute,
    private fs:FinanciadoresService,
    private router:Router,
    private sBar: MatSnackBar,
    private location:LocationStrategy,
  ) { }

  ngOnInit(): void {
    this.FinForm = this.fb.group({
      codf:[''],
      codi:['', [Validators.required]],
    });
    if(this.ac.snapshot.paramMap.get('codf')){
      this.codf = parseInt(this.ac.snapshot.paramMap.get('codf'));
      this.listarFinanciador(this.codf);
    }
    this.listarPersonas();
    this.listarInstituciones();
  }
  listarFinanciador(codf:number){
    this.fs.listarFinanciador(codf).subscribe(res=>{
      this.financiador = res;
      var u = this.financiador[0];
      this.FinForm.reset({
        codf:u.codf,
        codper:u.codper,
        codi:u.codi,
        estado:u.estado
      })
    })
  }
  listarPersonas(){
    this.ps.listarPersonas().subscribe(res=>{
      this.personas=res;
    })
  }
  listarInstituciones(){
    this.is.listarInstituciones().subscribe(res =>{
      this.instituciones = res;
    })
  }
  guardar(){
    if(this.ac.snapshot.paramMap.get('codf')){
      const xfin = this.FinForm.value;
      this.fs.modificarFinanciador(this.codf,xfin).subscribe(res=>{
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
      const xfin = this.FinForm.value;
      this.fs.registrarFinanciador(xfin).subscribe(res =>{
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
  getErrorMessage(campo:string){
    let message;
    if(this.FinForm.get(campo)?.errors?.required){
      message = 'campo requerido'
    }
    return message;
  }
  campoValido(campo:string):boolean{
    return (
      (this.FinForm.get(campo)?.touched || this.FinForm.get(campo)!.dirty) && !this.FinForm.get(campo)?.valid
      );
    }
    cancelar(){
      this.location.back();
    }
  }
