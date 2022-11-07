import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposComponent } from './equipos/equipos.component';
import { VerEquiposComponent } from './ver-equipos/ver-equipos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modulos/material.module';
import { RegMiembroComponent } from './reg-miembro/reg-miembro.component';
import { EquiposPipe } from './equipos.pipe';


@NgModule({
  declarations: [
    EquiposComponent,
    VerEquiposComponent,
    RegMiembroComponent,
    EquiposPipe
  ],
  imports: [
    CommonModule,
    EquiposRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class EquiposModule { }
