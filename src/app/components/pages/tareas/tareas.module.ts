import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareasRoutingModule } from './tareas-routing.module';
import { TareasComponent, HistorialDialog } from './tareas/tareas.component';
import { VerTareaComponent } from './ver-tarea/ver-tarea.component';
import { RegTareaComponent } from './reg-tarea/reg-tarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modulos/material.module';


@NgModule({
  declarations: [
    TareasComponent,
    VerTareaComponent,
    RegTareaComponent,
    HistorialDialog
  ],
  imports: [
    CommonModule,
    TareasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class TareasModule { }
