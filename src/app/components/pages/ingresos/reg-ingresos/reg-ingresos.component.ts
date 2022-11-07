import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IngresosService } from 'src/app/servicios/ingresos.service';
import { FinanciadoresService } from '../../../../servicios/financiadores.service';
import { ProyectosService } from '../../../../servicios/proyectos.service';
import { CambioService } from '../../../../servicios/cambio.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reg-ingresos',
  templateUrl: './reg-ingresos.component.html',
  styleUrls: ['./reg-ingresos.component.css'],
})
export class RegIngresosComponent implements OnInit {
  opciones = [
    { name: 'Dolares', value: 'Dolares' },
    { name: 'Bolivianos', value: 'Bolivianos' },
  ];
  durationInSeconds = 1000;
  min: number = 1;
  maxbs: number;
  maxds: number;
  codpro = this.ac.snapshot.params.codpro;
  coding = this.ac.snapshot.params.coding;
  ingresos!: any;
  proyectos!: any;
  proyecto!: any;
  financiadores!: any;
  ingForm!: UntypedFormGroup;
  ress: any;
  cambio: any;
  mensaje: any;
  todo: any;
  cambiof: any;
  codusu: number;
  totalBs: number;
  totalDs: number;
  constructor(
    private fb: UntypedFormBuilder,
    private is: IngresosService,
    private fs: FinanciadoresService,
    private ps: ProyectosService,
    private location: LocationStrategy,
    private router: Router,
    private ac: ActivatedRoute,
    private cs: CambioService,
    private sBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('cambio')) {
      this.cambiof = parseFloat(localStorage.getItem('cambio'));
      if (this.codpro) {
        this.listarProyecto(this.codpro);
      }
    }
    this.ingForm = this.fb.group({
      coding: [''],
      codf: ['', [Validators.required]],
      codpro: [parseInt(this.codpro)],
      codusu: [],
      ingreso: ['', [Validators.required]],
      idivisa: ['', [Validators.required]],
      cambio: [this.cambiof],
      cingreso: [
        '',
        [
          Validators.required,
          Validators.max(9223372036854775807),
          Validators.min(7000000000000000),
        ],
      ],
    });
    if (this.coding) {
      this.listarIngreso(this.coding);
    }
    this.listarFinanciadores();
  }
  listarIngreso(coding: number) {
    this.is.listarIngreso(coding).subscribe((res) => {
      this.ingresos = res;
      const u = this.ingresos[0];
      this.listarProyecto(u.codpro);
      this.codusu = parseInt(localStorage.getItem('codigo'));
      this.ingForm.reset({
        codf: u.codf,
        codpro: u.codpro,
        codusu: this.codusu,
        ingreso: u.ingreso,
        idivisa: u.idivisa,
        cingreso: u.cingreso,
      });
    });
  }
  listarProyecto(codpro: number) {
    this.ps.listarProyecto(codpro).subscribe((res) => {
      this.proyecto = res;
      this.is.listarIngresosbyProyecto(codpro).subscribe((res) => {
        this.todo = res;
        let sumIngresos = 0;
        for (let i = 0; i < this.todo.length; i++) {
          if (this.todo[i].idivisa == 'Bolivianos') {
            sumIngresos = sumIngresos + this.todo[i].ingreso;
          } else if (this.todo[i].idivisa == 'Dolares') {
            let cam = this.todo[i].ingreso * this.todo[i].cambio;
            sumIngresos = sumIngresos + cam;
          }
        }
        this.totalBs = sumIngresos;
        this.totalDs = this.totalBs / this.cambiof;
        if ((this.proyecto[0].divisa = 'Dolares')) {
          this.maxds =
            parseFloat(this.proyecto[0].costo_proyecto) - this.totalDs;
          this.maxbs =
            parseFloat(this.proyecto[0].costo_proyecto) * this.cambiof -
            this.totalBs;
          console.log('dolares - base ' + this.maxbs, this.maxds);
        } else {
          this.maxds =
            parseFloat(this.proyecto[0].costo_proyecto) / this.cambiof -
            this.totalDs;
          this.maxbs =
            parseFloat(this.proyecto[0].costo_proyecto) - this.totalBs;
          console.log('bolis - base ' + this.maxbs, this.maxds);
        }
      });
    });
  }
  listarFinanciadores() {
    this.fs.listarFinanciadores().subscribe((res) => {
      this.financiadores = res;
    });
  }
  getErrorMessage(campo: string) {
    let message;
    if (this.ingForm.get(campo)?.errors?.required) {
      message = 'campo requerido';
    } else if (this.ingForm.get(campo)?.hasError('minlength')) {
      const minLength =
        this.ingForm.get(campo)?.errors?.minlength.requiredLength;
      message = `introduzca mas de ${minLength} caracteres.`;
    } else if (this.ingForm.get(campo)?.hasError('maxlength')) {
      const maxLength =
        this.ingForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `introduzca menos de ${maxLength} caracteres.`;
    } else if (this.ingForm.get(campo)?.hasError('pattern')) {
      message = 'valor no valido.';
    } else if (this.ingForm.get(campo)?.hasError('min')) {
      message = `el numero es menor al permitido`;
    } else if (this.ingForm.get(campo)?.hasError('max')) {
      message = `el numero es mayor al permitido`;
    }
    return message;
  }

  guardar() {
    if (this.ac.snapshot.paramMap.get('coding')) {
      const xingreso = this.ingForm.value;
      console.log(xingreso);
      this.is.modificarIngreso(this.coding, xingreso).subscribe((res) => {
        this.mensaje = res;
        this.sBar.open(this.mensaje.mensaje, '', {
          duration: 5 * this.durationInSeconds,
          horizontalPosition: 'end',
          panelClass: ['snackbar'],
        });
        this.location.back();
      });
    } else {
      const xingreso = this.ingForm.value;
      this.is.registrarIngreso(xingreso).subscribe((res) => {
        this.mensaje = res;
        this.sBar.open(this.mensaje.mensaje, '', {
          duration: 5 * this.durationInSeconds,
          horizontalPosition: 'end',
          panelClass: ['snackbar'],
        });
        this.location.back();
        localStorage.removeItem('cambio');
      });
    }
  }
  cancelar() {
    this.location.back();
  }
  verProyecto() {
    this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);
    localStorage.removeItem('codpro');
    localStorage.removeItem('cambio');
  }
  volv() {
    this.location.back();
  }
}
