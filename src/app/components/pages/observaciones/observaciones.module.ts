import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObservacionesRoutingModule } from './observaciones-routing.module';
import { ObservacionesComponent } from './observaciones/observaciones.component';
import { RegObservacionesComponent } from './reg-observaciones/reg-observaciones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modulos/material.module';


@NgModule({
  declarations: [
    ObservacionesComponent,
    RegObservacionesComponent
  ],
  imports: [
    CommonModule,
    ObservacionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ObservacionesModule { }
