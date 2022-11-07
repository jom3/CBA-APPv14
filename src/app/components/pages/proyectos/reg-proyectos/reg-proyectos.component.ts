import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { InstitucionesService } from '../../../../servicios/instituciones.service';
import { TiposProyectosService } from '../../../../servicios/tipos-proyectos.service';
import { ProductosServiciosService } from '../../../../servicios/productos-servicios.service';
import { PersonalService } from '../../../../servicios/personal.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reg-proyectos',
  templateUrl: './reg-proyectos.component.html',
  styleUrls: ['./reg-proyectos.component.css'],
})
export class RegProyectosComponent implements OnInit {
  durationInSeconds = 1000;
  proyecto: any;
  personal: any;
  instituciones: any;
  tipos: any;
  productosServicios: any;
  proyForm: UntypedFormGroup;
  codpro: number;
  codu: number;
  mensaje:any;
  constructor(
    private fb: UntypedFormBuilder,
    private ps: PersonalService,
    private prs: ProyectosService,
    private is: InstitucionesService,
    private ts: TiposProyectosService,
    private pss: ProductosServiciosService,
    private ac: ActivatedRoute,
    private router: Router,
    private sBar: MatSnackBar,
    private location: LocationStrategy
  ) {}

  ngOnInit(): void {
    this.proyForm = this.fb.group({
      codpro: [''],
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ],
      ],
      codper: ['', [Validators.required]],
      codi: [''],
      caracter: ['', [Validators.required]],
      codtipo: ['', [Validators.required]],
      justificacion: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(255),
        ],
      ],
      objetivo: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ],
      ],
      codps: ['', [Validators.required]],
      codusu: [],
      costo_proyecto: ['', [Validators.required]],
      divisa: ['', [Validators.required]],
      finicio: ['', [Validators.required]],
      fejecucion: ['', [Validators.required]],
      ffin: ['', [Validators.required]],
    });
    if (this.ac.snapshot.paramMap.get('codpro')) {
      this.codpro = parseInt(this.ac.snapshot.paramMap.get('codpro'));
      this.codu = parseInt(localStorage.getItem('codigo'));
      this.listarProyecto(this.codpro);
    }
    this.listarPersonal();
    this.listarInstituciones();
    this.listarTipos();
    this.listarPS();
  }
  listarProyecto(codpro: number) {
    this.prs.listarProyecto(codpro).subscribe((res) => {
      this.proyecto = res;
      const u = this.proyecto[0];
      this.proyForm.reset({
        titulo: u.titulo,
        codper: u.codper,
        codi: u.codi,
        caracter: u.caracter,
        codtipo: u.codtipo,
        justificacion: u.justificacion,
        objetivo: u.objetivo,
        codps: u.codps,
        codusu: this.codu,
        costo_proyecto: u.costo_proyecto,
        divisa: u.divisa,
        finicio: u.finicio,
        fejecucion:u.fejecucion,
        ffin: u.ffin,
      });
    });
  }
  listarPersonal() {
    this.ps.listarPersonales().subscribe((res) => {
      this.personal = res;
    });
  }
  listarInstituciones() {
    this.is.listarInstituciones().subscribe((res) => {
      this.instituciones = res;
    });
  }
  listarTipos() {
    this.ts.listarTipos().subscribe((res) => {
      this.tipos = res;
    });
  }
  listarPS() {
    this.pss.listarProductosServicios().subscribe((res) => {
      this.productosServicios = res;
    });
  }
  getErrorMessage(campo: string) {
    let message;
    if (this.proyForm.get(campo)?.errors?.required) {
      message = 'campo requerido';
    } else if (this.proyForm.get(campo)?.hasError('minlength')) {
      const minLength =
        this.proyForm.get(campo)?.errors?.minlength.requiredLength;
      message = `introduzca mas de ${minLength} caracteres.`;
    } else if (this.proyForm.get(campo)?.hasError('maxlength')) {
      const maxLength =
        this.proyForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `introduzca menos de ${maxLength} caracteres.`;
    } else if (this.proyForm.get(campo)?.hasError('pattern')) {
      message = 'valor no valido.';
    } else if (this.proyForm.get(campo)?.hasError('min')) {
      message = `el numero tiene que tener mas de 7 digitos`;
    }
    return message;
  }

  campoValido(campo: string): boolean {
    return (
      (this.proyForm.get(campo)?.touched || this.proyForm.get(campo)!.dirty) &&
      !this.proyForm.get(campo)?.valid
    );
  }
  guardar() {
    if (this.ac.snapshot.paramMap.get('codpro')) {
      const xproyecto = this.proyForm.value;
      this.prs.modificarProyecto(this.codpro, xproyecto).subscribe((res) => {
        this.mensaje = res;
        this.sBar.open(this.mensaje.mensaje, '', {
          duration: 5 * this.durationInSeconds,
          horizontalPosition: 'end',
          panelClass: ['snackbar'],
        });
        this.location.back();
      });
    } else {
      const xproyecto = this.proyForm.value;
      this.prs.registrarProyecto(xproyecto).subscribe((res) => {
        this.mensaje = res;
        this.sBar.open(this.mensaje.mensaje, '', {
          duration: 5 * this.durationInSeconds,
          horizontalPosition: 'end',
          panelClass: ['snackbar'],
        });
        this.location.back();
      });
    }
  }
  cancelar() {
    this.location.back();
  }
}
