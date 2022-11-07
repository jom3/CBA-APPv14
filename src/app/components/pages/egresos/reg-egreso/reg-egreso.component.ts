import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { EgresosService } from '../../../../servicios/egresos.service';
import { PersonalService } from '../../../../servicios/personal.service';
import { CambioService } from '../../../../servicios/cambio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngresosService } from '../../../../servicios/ingresos.service';

@Component({
  selector: 'app-reg-egreso',
  templateUrl: './reg-egreso.component.html',
  styleUrls: ['./reg-egreso.component.css'],
})
export class RegEgresoComponent implements OnInit {
  min: number = 1;
  max: number;
  todoi: any;
  todoe: any;
  durationInSeconds = 1000;
  mensaje: any;
  codpro = parseInt(this.ac.snapshot.paramMap.get('codpro'));
  codegre = this.ac.snapshot.paramMap.get('codegre');
  egreso: any;
  proyectos: any;
  financiadores!: any;
  egreForm: UntypedFormGroup;
  personal: any;
  codper: number;
  ress: any;
  cambio: any;
  cambiof: any;
  proyecto: any;
  codusu: number;
  egresos: any;
  ingresos: any;
  maxbs:number;
  maxds:number;
  constructor(
    private fb: UntypedFormBuilder,
    private es: EgresosService,
    private perService: PersonalService,
    private ps: ProyectosService,
    private location: LocationStrategy,
    private router: Router,
    private ac: ActivatedRoute,
    private cs: CambioService,
    private sBar: MatSnackBar,
    private is: IngresosService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('cambio')) {
      this.cambiof = parseFloat(localStorage.getItem('cambio'));
      this.codper = parseInt(localStorage.getItem('codigo'));
      if (this.codpro) {
        this.listarTodobyProyecto(this.codpro);
      }
    }
    this.egreForm = this.fb.group({
      codegre: ['', []],
      codper: this.codper,
      codpro: this.codpro,
      codusu: [],
      retiro: ['', [Validators.required]],
      edivisa: ['', [Validators.required]],
      cambio: [this.cambiof],
      cegreso: [ '',
      [
        Validators.required,
        Validators.max(9223372036854775807),
        Validators.min(7000000000000000),
      ],],
    });
    if (this.codegre) {
      this.listarEgreso(parseInt(this.codegre));
    }
    this.listarPersonal();
  }
  listarPersonal() {
    this.perService.listarPersonal(this.codper).subscribe((res) => {
      this.personal = res;
    });
  }
  listarEgreso(codegre: number) {
    this.es.listarEgreso(codegre).subscribe((res) => {
      this.egreso = res;
      const u = this.egreso[0];
      this.codpro = u.codpro;
      this.listarTodobyProyecto(this.codpro);
      this.egreForm.reset({
        codper: u.codper,
        codpro: u.codpro,
        codusu: this.codper,
        retiro: u.retiro,
        edivisa: u.edivisa,
        cegreso: u.cegreso,
      });
    });
  }
  listarTodobyProyecto(codpro: number) {
    this.ps.listarProyecto(codpro).subscribe((res) => {
      this.proyecto = res;
      this.is.listarIngresosbyProyecto(codpro).subscribe((res) => {
        this.ingresos = res;
        this.es.listarEgresosbyProyecto(codpro).subscribe((res) => {
          this.egresos = res;
          let sumIngresos = 0;
          let sumEgresos = 0;
          for (let i = 0; i < this.ingresos.length; i++) {
            if (this.ingresos[i].idivisa == 'Bolivianos') {
              sumIngresos = sumIngresos + this.ingresos[i].ingreso;
            } else if (this.ingresos[i].idivisa == 'Dolares') {
              let cami = this.ingresos[i].ingreso * this.ingresos[i].cambio;
              sumIngresos = sumIngresos + cami;
            }
          }
          for (let i = 0; i < this.egresos.length; i++) {
            if (this.egresos[i].edivisa == 'Bolivianos') {
              sumEgresos = sumEgresos + this.egresos[i].retiro;
            } else if (this.egresos[i].edivisa == 'Dolares') {
              let came = this.egresos[i].retiro * this.egresos[i].cambio;
              sumEgresos = sumEgresos + came;
            }
          }
          const totali = sumIngresos;
          const totale = sumEgresos;
          this.maxbs = totali - totale;
          this.maxds = (totali - totale)/this.cambiof;
        });
      });
    });
  }
  getErrorMessage(campo: string) {
    let message;
    if (this.egreForm.get(campo)?.errors?.required) {
      message = 'campo requerido';
    } else if (this.egreForm.get(campo)?.hasError('minlength')) {
      const minLength =
        this.egreForm.get(campo)?.errors?.minlength.requiredLength;
      message = `introduzca mas de ${minLength} caracteres.`;
    } else if (this.egreForm.get(campo)?.hasError('maxlength')) {
      const maxLength =
        this.egreForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `introduzca menos de ${maxLength} caracteres.`;
    } else if (this.egreForm.get(campo)?.hasError('pattern')) {
      message = 'valor no valido.';
    } else if (this.egreForm.get(campo)?.hasError('min')) {
      message = `el numero es menor al permitido`;
    } else if (this.egreForm.get(campo)?.hasError('max')) {
      message = `el numero es mayor al permitido`;
    }
    return message;
  }
  guardar() {
    if (this.ac.snapshot.paramMap.get('codegre')) {
      const xegreso = this.egreForm.value;
      console.log(xegreso);
      this.es
        .modificarEgreso(parseInt(this.codegre), xegreso)
        .subscribe((res) => {
          this.mensaje = res;
          this.sBar.open(this.mensaje.mensaje, '', {
            duration: 5 * this.durationInSeconds,
            horizontalPosition: 'end',
            panelClass: ['snackbar'],
          });
          this.location.back();
        });
    } else {
      const xegreso = this.egreForm.value;
      console.log(xegreso);
      this.es.registrarEgreso(xegreso).subscribe((res) => {
        this.mensaje = res;
        this.sBar.open(this.mensaje.mensaje, '', {
          duration: 5 * this.durationInSeconds,
          horizontalPosition: 'end',
          panelClass: ['snackbar'],
        });
        localStorage.removeItem('cambio');
        this.location.back();
      });
    }
  }
  cancelar() {
    this.location.back();
  }
  verProyecto(){
    this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);
  }
}
