import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { MiembrosService } from '../../../../servicios/miembros.service';
import { PersonalService } from '../../../../servicios/personal.service';
import { RolesService } from '../../../../servicios/roles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProyectosService } from '../../../../servicios/proyectos.service';

@Component({
  selector: 'app-reg-miembro',
  templateUrl: './reg-miembro.component.html',
  styleUrls: ['./reg-miembro.component.css']
})
export class RegMiembroComponent implements OnInit {
  durationInSeconds = 1000
  codpro:number;
  proyecto:any;
  mmForm!: UntypedFormGroup;
  personal!:any;
  roles!:any;
  miembro!:any;
  codeq:number;
  codmiem = this.ac.snapshot.params.codmiem;
  mensaje:any;
  perso:any;
  constructor(
    private fb:UntypedFormBuilder,
    private ac: ActivatedRoute,
    private location: LocationStrategy,
    private ms: MiembrosService,
    private ps: PersonalService,
    private rs: RolesService,
    private sBar: MatSnackBar,
    private pr:ProyectosService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(this.ac.snapshot.paramMap.get('codeq')){
      this.codeq = parseInt(this.ac.snapshot.paramMap.get('codeq'));
      this.listarProyectobyEquipo(this.codeq);
    }
    this.mmForm = this.fb.group({
      codmiem:[''],
      codper:['', [Validators.required]],
      codrol:['', [Validators.required]],
      codeq:this.codeq
    });
    if(this.codmiem){
      this.listarMiembro(parseInt(this.codmiem));
    }
    this.listarRoles();
    this.listarPersonales();
  }
  listarRoles(){
    this.rs.listarRolforEquipos().subscribe(res=>{
      this.roles=res;
    })
  }
  listarMiembro(codmiem:number){
    this.ms.listarMiembro(codmiem).subscribe(res=>{
      this.miembro=res;
      const u = this.miembro[0];
      this.listarPersonal(u.codper);
      this.listarProyectobyEquipo(u.codeq);
      this.mmForm.reset({
        codmiem:u.codmiem,
        codper:u.codper,
        codrol:u.codrol,
        codeq:u.codeq,
        estado:u.estado
      })
    })
  }
  listarProyectobyEquipo(codeq:number){
    this.pr.listarProyectobyEquipo(codeq).subscribe(res=>{
      this.proyecto = res;
      this.codpro = this.proyecto[0].codpro;
    })
  }
  listarPersonales(){
    this.ps.listarPersonales().subscribe(res=>{
      this.personal=res;
    })
  }
  listarPersonal(codper:number){
    this.ps.listarPersonal(codper).subscribe(res=>{
      this.perso=res;
    })
  }
  getErrorMessage(campo:string){
    let message;
    if(this.mmForm.get(campo)?.errors?.required){
      message = 'campo requerido'
    }
    return message;
  }

  campoValido(campo:string):boolean{
    return (
      (this.mmForm.get(campo)?.touched || this.mmForm.get(campo)!.dirty) && !this.mmForm.get(campo)?.valid
    );
  }
  guardar(){
    if(this.codmiem){
      const xmm = this.mmForm.value;
      this.ms.modificarMiembro(xmm,parseInt(this.codmiem)).subscribe(res=>{
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
        const xmm = this.mmForm.value;
        this.ms.registrarMiembro(xmm).subscribe(res =>{
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
  verProyecto(){
    this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);

  }
}
