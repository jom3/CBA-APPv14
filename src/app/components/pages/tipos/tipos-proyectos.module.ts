import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiposProyectosRoutingModule } from './tipos-proyectos-routing.module';
import { TiposProyectosComponent } from './tipos-proyectos/tipos-proyectos.component';
import { RegTiposComponent } from './reg-tipos/reg-tipos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modulos/material.module';
import { TiposPipe } from './tipos.pipe';


@NgModule({
  declarations: [
    TiposProyectosComponent,
    RegTiposComponent,
    TiposPipe
  ],
  imports: [
    CommonModule,
    TiposProyectosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class TiposProyectosModule { }
