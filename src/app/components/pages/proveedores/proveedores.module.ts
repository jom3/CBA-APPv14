import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { RegProveedoresComponent } from './reg-proveedores/reg-proveedores.component';
import { VerProveedoresComponent } from './ver-proveedores/ver-proveedores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modulos/material.module';
import { ProveedoresPipe } from './proveedores.pipe';


@NgModule({
  declarations: [
    ProveedoresComponent,
    RegProveedoresComponent,
    VerProveedoresComponent,
    ProveedoresPipe
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ProveedoresModule { }
