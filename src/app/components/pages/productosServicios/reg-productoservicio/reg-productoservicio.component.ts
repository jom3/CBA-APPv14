import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosServiciosService } from 'src/app/servicios/productos-servicios.service';
import { LocationStrategy } from '@angular/common';
import { ProveedoresService } from '../../../../servicios/proveedores.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reg-productoservicio',
  templateUrl: './reg-productoservicio.component.html',
  styleUrls: ['./reg-productoservicio.component.css'],
})
export class RegProductoservicioComponent implements OnInit {
  durationInSeconds = 1000;
  productosServicios: any;
  proveedores: any;
  productos: any;
  servicios: any;
  psForm: UntypedFormGroup;
  p: number = 1;
  tiulo1 = 'Registrar producto o servicio';
  tiulo2 = 'Modificar producto o servicio';
  codps: number;
  mensaje: any;
  constructor(
    private fb: UntypedFormBuilder,
    private pss: ProductosServiciosService,
    private router: Router,
    private location: LocationStrategy,
    private ac: ActivatedRoute,
    private ps: ProveedoresService,
    private sBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.psForm = this.fb.group({
      codps: [''],
      nombre: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      descripcion: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
      codprov: ['', [Validators.required]],
      tipops: ['', [Validators.required]],
      cantidad: ['',[Validators.required, Validators.max(400), Validators.min(1)]],
      tipocantidad: ['', [Validators.required]],
      precio_unitario: ['', [Validators.required]],
      divisa: ['', [Validators.required]],
    });
    if (this.ac.snapshot.paramMap.get('codps')) {
      this.codps = parseInt(this.ac.snapshot.paramMap.get('codps'));
      this.listarPs(this.codps);
    }
    this.listarProv();
  }
  listarPs(codps: number) {
    this.pss.listarProductoServicio(codps).subscribe((res) => {
      this.productosServicios = res;
      const u = this.productosServicios[0];
      this.psForm.reset({
        codps: u.codps,
        coda: u.coda,
        nombre: u.nombre,
        descripcion: u.descripcion,
        codprov: u.codprov,
        tipops: u.tipops,
        cantidad: u.cantidad,
        tipocantidad: u.tipocantidad,
        precio_unitario: u.precio_unitario,
        divisa: u.divisa,
      });
    });
  }
  listarProv() {
    this.ps.listarProveedoresActivos().subscribe((res) => {
      this.proveedores = res;
    });
  }
  guardar() {
    if (this.ac.snapshot.paramMap.get('codps')) {
      const codps = parseInt(this.ac.snapshot.paramMap.get('codps'));
      const xps = this.psForm.value;
      this.pss.modificarProductoServicio(codps, xps).subscribe((res) => {
        this.mensaje = res;
        this.sBar.open(this.mensaje.mensaje, '', {
          duration: 5 * this.durationInSeconds,
          horizontalPosition: 'end',
          panelClass: ['snackbar'],
        });
        this.location.back();
      });
    } else {
      const xps = this.psForm.value;
      this.pss.registrarProductoServicio(xps).subscribe((res) => {
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
  getErrorMessage(campo: string) {
    let message;
    if (this.psForm.get(campo)?.errors?.required) {
      message = 'campo requerido';
    } else if (this.psForm.get(campo)?.hasError('minlength')) {
      const minLength =
        this.psForm.get(campo)?.errors?.minlength.requiredLength;
      message = `introduzca mas de ${minLength} caracteres.`;
    } else if (this.psForm.get(campo)?.hasError('maxlength')) {
      const maxLength =
        this.psForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `introduzca menos de ${maxLength} caracteres.`;
    } else if (this.psForm.get(campo)?.hasError('pattern')) {
      message = 'valor no valido.';
    } else if (this.psForm.get(campo)?.hasError('min')) {
      message = `la cantidad minima es 1`;
    } else if (this.psForm.get(campo)?.hasError('max')) {
      message = `la cantidad maxima es 400`;
    }
    return message;
  }
}
