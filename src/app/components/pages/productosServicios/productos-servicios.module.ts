import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosServiciosRoutingModule } from './productos-servicios-routing.module';
import { ProductosServiciosComponent } from './productos-servicios/productos-servicios.component';
import { VerProductoServicioComponent } from './ver-producto-servicio/ver-producto-servicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modulos/material.module';
import { RegProductoservicioComponent } from './reg-productoservicio/reg-productoservicio.component';
import { ProductosServiciosPipe } from './productos-servicios.pipe';


@NgModule({
  declarations: [
    ProductosServiciosComponent,
    VerProductoServicioComponent,
    RegProductoservicioComponent,
    ProductosServiciosPipe,
  ],
  imports: [
    CommonModule,
    ProductosServiciosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ProductosServiciosModule { }
