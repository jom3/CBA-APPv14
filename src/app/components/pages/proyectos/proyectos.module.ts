import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosComponent, PostulacionDialog } from './proyectos/proyectos.component';
import { RegProyectosComponent } from './reg-proyectos/reg-proyectos.component';
import { VerProyectoComponent } from './ver-proyecto/ver-proyecto.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../../../modulos/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProyectosPipe } from './proyectos.pipe';


@NgModule({
  declarations: [
    ProyectosComponent,
    RegProyectosComponent,
    VerProyectoComponent,
    ProyectosPipe,
    PostulacionDialog
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ]
})
export class ProyectosModule { }
