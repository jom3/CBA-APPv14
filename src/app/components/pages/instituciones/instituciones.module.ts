import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitucionesRoutingModule } from './instituciones-routing.module';
import { InstitucionesComponent } from './instituciones/instituciones.component';
import { RegInstitucionesComponent } from './reg-instituciones/reg-instituciones.component';
import { VerInstitucionesComponent } from './ver-instituciones/ver-instituciones.component';
import { MaterialModule } from '../../../modulos/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InstitucionesPipe } from './instituciones.pipe';


@NgModule({
  declarations: [
    InstitucionesComponent,
    RegInstitucionesComponent,
    VerInstitucionesComponent,
    InstitucionesPipe,
  ],
  imports: [
    CommonModule,
    InstitucionesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InstitucionesModule { }
