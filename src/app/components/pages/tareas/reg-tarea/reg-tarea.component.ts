import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasService } from 'src/app/servicios/tareas.service';
import { MiembrosService } from '../../../../servicios/miembros.service';
import { ProyectosService } from '../../../../servicios/proyectos.service';
import { EgresosService } from '../../../../servicios/egresos.service';

@Component({
  selector: 'app-reg-tarea',
  templateUrl: './reg-tarea.component.html',
  styleUrls: ['./reg-tarea.component.css']
})
export class RegTareaComponent implements OnInit {
  max:number = 100;
  min:number = 0;
  valor:number=0;
  durationInSeconds = 1000;
  tareas:any;
  ltareas:any;
  proyecto:any;
  miembros:any;
  tsForm: UntypedFormGroup;
  codpro:any;
  codt:any;
  mensaje:any;
  egresos:any;
  codusu:number;
  status:any;
  constructor(
    private ac: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private location: LocationStrategy,
    private router: Router,
    private ts:TareasService,
    private ms: MiembrosService,
    private ps: ProyectosService,
    private sBar: MatSnackBar,
    private es:EgresosService
  ) { }

  ngOnInit(): void {
    if(this.ac.snapshot.paramMap.get('codpro')){
      this.codpro = parseInt(this.ac.snapshot.paramMap.get('codpro'));
      this.listarProyecto(this.codpro);
      this.listarEgresosbyProyecto(this.codpro);
      this.listarMiembros(this.codpro);
      this.listarTareas(this.codpro);
      this.codusu = parseInt(localStorage.getItem('codigo'));
    }else{
      if(this.ac.snapshot.paramMap.get('codt')){
        this.codt = parseInt(this.ac.snapshot.paramMap.get('codt'));
        this.listarTarea(this.codt);
        this.codusu = parseInt(localStorage.getItem('codigo'));
     }
    }
    this.tsForm = this.fb.group({
      predecesor:[],
      codpro:[this.codpro],
      codmiem:['', [Validators.required]],
      codusu:[],
      avance:[],
      codegre:[],
      nombre:['',[Validators.required, Validators.minLength(3),Validators.maxLength(100)]],
      descripcion:['',[Validators.required, Validators.minLength(3),Validators.maxLength(255)]]
    });
  }
  listarTareas(codpro:number){
    this.ts.listarTareasbyProyecto(codpro).subscribe(res=>{
      this.ltareas = res;
      console.log(this.ltareas)
    })
  }
  listarTarea(codt:number){
    this.ts.listarTarea(codt).subscribe(res=>{
      this.tareas = res;
      const u = this.tareas[0];
      this.codpro = u.codpro;
      this.listarProyecto(u.codpro);
      this.min= u.avance;
      this.tsForm.reset({
        codt:u.codt,
        predecesor:u.predecesor,
        codpro:u.codpro,
        codusu:this.codusu,
        codmiem:u.codmiem,
        avance:this.min,
        codegre:u.codegre,
        nombre:u.nomta,
        descripcion:u.descripcion,
      });
      this.listarEgresosbyProyecto(u.codpro);
      this.listarMiembros(u.codpro);
    });
  }
  listarProyecto(codpro:number){
    this.ps.listarProyecto(codpro).subscribe(res=>{
      this.proyecto = res;
      this.status= this.proyecto[0].estado;
    })
  }
  listarMiembros(codpro:number){
    this.ms.listarMiembrosbyProyecto(codpro).subscribe(res=>{
      this.miembros = res;
    });
  }
  listarEgresosbyProyecto(codpro:number){
    this.es.listarEgresosbyProyecto(codpro).subscribe(res=>{
      this.egresos = res;
    });
  }
  getErrorMessage(campo:string){
    let message;
    if(this.tsForm.get(campo)?.errors?.required){
      message = 'campo requerido';
    }else if(this.tsForm.get(campo)?.hasError('minlength')){
      const minLength = this.tsForm.get(campo)?.errors?.minlength.requiredLength;
      message = `introduzca mas de ${minLength} caracteres.`;
    }else if(this.tsForm.get(campo)?.hasError('maxlength')){
      const maxLength = this.tsForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `introduzca menos de ${maxLength} caracteres.`;
    }else if(this.tsForm.get(campo)?.hasError('pattern')){
      message = 'valor no valido.';
    }
    return message;
  }

  campoValido(campo:string):boolean{
    return (
      (this.tsForm.get(campo)?.touched || this.tsForm.get(campo)!.dirty) && !this.tsForm.get(campo)?.valid
    );
  }
  guardar(){
    if(this.ac.snapshot.paramMap.get('codt')){
      const ts = this.tsForm.value;
      this.ts.modificarTarea(parseInt(this.codt),ts).subscribe(res=>{
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
      const ts = this.tsForm.value;
      this.ts.registrarTarea(ts).subscribe(res =>{
        this.mensaje = res;
          this.sBar.open(this.mensaje.mensaje,'',
          {
            duration: 5*this.durationInSeconds,
            horizontalPosition:"end",
            panelClass: ['snackbar']
          });
          this.location.back();
      });
    }
  }
  cancelar(){
    this.location.back();
  }
  verProyecto(){
    this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);
  }
}
