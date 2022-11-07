import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, LocationStrategy } from '@angular/common';
import { ArchivosService } from '../../../../servicios/archivos.service';
import { ProyectosService } from '../../../../servicios/proyectos.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-reg-archivo',
  templateUrl: './reg-archivo.component.html',
  styleUrls: ['./reg-archivo.component.css']
})
export class RegArchivoComponent implements OnInit {
  durationInSeconds = 1000
  archivo!:any;
  archivos!:any;
  arcForm!:UntypedFormGroup;
  codpro!:any;
  codarc!:any;
  hoy!:any;
  mensaje:any;
  codusu:any;
  proyecto:any;
  constructor(
    private ac: ActivatedRoute,
    private location: LocationStrategy,
    private as: ArchivosService,
    private fb: UntypedFormBuilder,
    private datePipe: DatePipe,
    private sBar: MatSnackBar,
    private ps: ProyectosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('codigo')){
      this.codusu = parseInt(localStorage.getItem('codigo'));
    }
    if(this.ac.snapshot.paramMap.get('codpro')){
      this.codpro = this.ac.snapshot.paramMap.get('codpro');
      this.listarProyecto(this.codpro);
    }
    if(this.ac.snapshot.paramMap.get('codarc')){
      this.codarc = this.ac.snapshot.params.codarc;
      this.listarArchivo(this.codarc);
    }
    this.obtenerFecha();
    this.arcForm = this.fb.group({
      codarc:[''],
      codpro:[this.codpro],
      codusu:[],
      archivo:[''],
      nombre:['',[Validators.required, Validators.minLength(3),Validators.maxLength(100)]],
      descripcion:['',[Validators.required, Validators.minLength(3),Validators.maxLength(255)]],
      fsubida:[this.hoy]
    })
  }
  obtenerFecha(){
    var date = new Date();
    this.hoy = this.datePipe.transform(date,"dd-MM-yyyy");
  }
  selectArchivo(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.archivo = file;
    }
  }
  listarArchivo(codarc:number){
    this.as.listarArchivo(codarc).subscribe(res=>{
      this.archivos = res;
      const u = this.archivos[0];
      this.codpro = u.codpro;
      this.listarProyecto(u.codpro);
      this.arcForm.reset({
        codarc:u.codarc,
        codpro:u.codpro,
        codusu:this.codusu,
        nombre:u.nombre,
        descripcion:u.descripcion,
        fsubida:u.fsubida
      })
    })
  }
  listarProyecto(codpro:number){
    this.ps.listarProyecto(codpro).subscribe(res=>{
      this.proyecto = res;
    })
  }
  getErrorMessage(campo:string){
    let message;
    if(this.arcForm.get(campo)?.errors?.required){
      message = 'campo requerido'
    }else if(this.arcForm.get(campo)?.hasError('minlength')){
      const minLength = this.arcForm.get(campo)?.errors?.minlength.requiredLength;
      message = `introduzca mas de ${minLength} caracteres.`
    }else if(this.arcForm.get(campo)?.hasError('maxlength')){
      const maxLength = this.arcForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `introduzca menos de ${maxLength} caracteres.`
    }
    return message;
  }

  campoValido(campo:string):boolean{
    return (
      (this.arcForm.get(campo)?.touched || this.arcForm.get(campo)!.dirty) && !this.arcForm.get(campo)?.valid
    );
  }
  guardar(){
    if(this.ac.snapshot.paramMap.get('codarc')){
      const xarchivo = this.arcForm.value;
      this.as.modificarArchivo(parseInt(this.codarc),xarchivo).subscribe(res=>{
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
        const xarchivo = new FormData();
        xarchivo.append('codpro', this.arcForm.get('codpro').value);
        xarchivo.append('nombre', this.arcForm.get('nombre').value);
        xarchivo.append('archivo', this.archivo);
        xarchivo.append('descripcion', this.arcForm.get('descripcion').value);
        xarchivo.append('fsubida', this.arcForm.get('fsubida').value);
        this.as.registrarArchivo(xarchivo).subscribe(res =>{
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
