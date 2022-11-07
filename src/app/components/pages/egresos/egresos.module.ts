import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosRoutingModule } from './egresos-routing.module';
import { EgresosComponent } from './egresos/egresos.component';
import { VerEgresosComponent } from './ver-egresos/ver-egresos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegEgresoComponent } from './reg-egreso/reg-egreso.component';
import { EgresosPipe } from './egresos.pipe';
import { MaterialModule } from '../../../modulos/material.module';


@NgModule({
  declarations: [
    EgresosComponent,
    VerEgresosComponent,
    RegEgresoComponent,
    EgresosPipe
  ],
  imports: [
    CommonModule,
    EgresosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class EgresosModule { }
