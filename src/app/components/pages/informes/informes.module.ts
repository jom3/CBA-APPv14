import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformesRoutingModule } from './informes-routing.module';
import { InformeProyectoComponent } from './informe-proyecto/informe-proyecto.component';
import { InformeIngresosComponent } from './informe-ingresos/informe-ingresos.component';
import { InformeEgresosComponent } from './informe-egresos/informe-egresos.component';
import { InformeEncargadosComponent } from './informe-encargados/informe-encargados.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modulos/material.module';
import { InformeEconomicoComponent } from './informe-economico/informe-economico.component';
import { InformeEjecucionComponent } from './informe-ejecucion/informe-ejecucion.component';
import { InformeTareasComponent } from './informe-tareas/informe-tareas.component';


@NgModule({
  declarations: [
    InformeProyectoComponent,
    InformeIngresosComponent,
    InformeEgresosComponent,
    InformeEncargadosComponent,
    InformeEconomicoComponent,
    InformeEjecucionComponent,
    InformeTareasComponent
  ],
  imports: [
    CommonModule,
    InformesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class InformesModule { }
