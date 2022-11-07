import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchivosRoutingModule } from './archivos-routing.module';
import { ArchivosComponent } from './archivos/archivos.component';
import { VerArchivoComponent } from './ver-archivo/ver-archivo.component';
import { RegArchivoComponent } from './reg-archivo/reg-archivo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modulos/material.module';
import { ArchivosPipe } from './archivos.pipe';


@NgModule({
  declarations: [
    ArchivosComponent,
    VerArchivoComponent,
    RegArchivoComponent,
    ArchivosPipe
  ],
  imports: [
    CommonModule,
    ArchivosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ArchivosModule { }
