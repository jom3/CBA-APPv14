import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MiembrosService } from '../../../../servicios/miembros.service';
import { ObservacionesService } from '../../../../servicios/observaciones.service';
import { PersonasService } from '../../../../servicios/personas.service';
import { ProyectosService } from '../../../../servicios/proyectos.service';

@Component({
  selector: 'app-reg-observaciones',
  templateUrl: './reg-observaciones.component.html',
  styleUrls: ['./reg-observaciones.component.css'],
})
export class RegObservacionesComponent implements OnInit {
  durationInSeconds = 1000;
  proyecto: any;
  observaciones: any;
  miembros: any;
  osForm!: UntypedFormGroup;
  codpro: any;
  codo: any;
  codper: any;
  per: any;
  persona!: any;
  p: number = 1;
  datos: any = [];
  mensaje: any;
  constructor(
    private location: LocationStrategy,
    private ac: ActivatedRoute,
    private router: Router,
    private os: ObservacionesService,
    private ps: PersonasService,
    private fb: UntypedFormBuilder,
    private sBar: MatSnackBar,
    private ms: MiembrosService,
    private pr: ProyectosService
  ) {}

  ngOnInit(): void {
    if (this.ac.snapshot.paramMap.get('codpro')) {
      this.codpro = this.ac.snapshot.paramMap.get('codpro');
      this.codper = localStorage.getItem('codigo');
      this.listarMiembros(this.codpro);
      this.listarProyecto(this.codpro);
    } else {
      if (this.ac.snapshot.paramMap.get('codo')) {
        this.codo = this.ac.snapshot.paramMap.get('codo');
        this.listarObservacion(parseInt(this.codo));
      }
    }
    this.osForm = this.fb.group({
      codo: [],
      codpro: [this.codpro],
      codper: [this.codper],
      razon: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      codmiem: ['', [Validators.required]],
    });
  }
  listarProyecto(codpro: number) {
    this.pr.listarProyecto(codpro).subscribe((res) => {
      this.proyecto = res;
    });
  }
  listarPersona(codper: number) {
    this.ps.listarPersona(codper).subscribe((res) => {
      this.persona = res;
    });
  }
  listarMiembros(codpro: number) {
    this.ms.listarMiembrosbyProyecto(codpro).subscribe((res) => {
      this.miembros = res;
    });
  }
  listarObservacion(codo: number) {
    this.os.listarObservacion(codo).subscribe((res) => {
      this.observaciones = res;
      const u = this.observaciones[0];
      this.codpro = u.codpro;
      this.listarProyecto(this.codpro);
      this.osForm.reset({
        codo: u.codo,
        codper: u.codper,
        codmiem: u.codmiem,
        codpro: u.codpro,
        razon: u.razon,
        estado: u.estado,
      });
    });
  }

  getErrorMessage(campo: string) {
    let message;
    if (this.osForm.get(campo)?.errors?.required) {
      message = 'campo requerido';
    } else if (this.osForm.get(campo)?.hasError('minlength')) {
      const minLength =
        this.osForm.get(campo)?.errors?.minlength.requiredLength;
      message = `introduzca mas de ${minLength} caracteres.`;
    } else if (this.osForm.get(campo)?.hasError('maxlength')) {
      const maxLength =
        this.osForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `introduzca menos de ${maxLength} caracteres.`;
    } else if (this.osForm.get(campo)?.hasError('pattern')) {
      message = 'valor no valido.';
    } else if (this.osForm.get(campo)?.hasError('min')) {
      message = `el numero tiene que tener mas de 7 digitos`;
    }
    return message;
  }
  guardar() {
    if (this.codo) {
      if (this.osForm.invalid) {
        return;
      } else {
        const xob = this.osForm.value;
        this.os
          .modificarObservacion(parseInt(this.codo), xob)
          .subscribe((res) => {
            this.mensaje = res;
            this.sBar.open(this.mensaje.mensaje, '', {
              duration: 5 * this.durationInSeconds,
              horizontalPosition: 'end',
              panelClass: ['snackbar'],
            });
            this.location.back();
          });
      }
    } else {
      if (this.osForm.invalid) {
        return;
      } else {
        const xob = this.osForm.value;
        this.os.registrarObservacion(xob).subscribe((res) => {
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
  }
  cancelar() {
    this.location.back();
  }
  verProyecto() {
    this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);
  }
}
