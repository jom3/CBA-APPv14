import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresosRoutingModule } from './ingresos-routing.module';
import { IngresosComponent } from './ingresos/ingresos.component';
import { RegIngresosComponent } from './reg-ingresos/reg-ingresos.component';
import { VerIngresosComponent } from './ver-ingresos/ver-ingresos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngresosPipe } from './ingresos.pipe';
import { MaterialModule } from '../../../modulos/material.module';

@NgModule({
  declarations: [
    IngresosComponent,
    RegIngresosComponent,
    VerIngresosComponent,
    IngresosPipe
  ],
  imports: [
    CommonModule,
    IngresosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class IngresosModule { }
