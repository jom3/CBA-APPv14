import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuCuentaRoutingModule } from './menu-cuenta-routing.module';
import { MenuCuentaComponent } from './menu-cuenta/menu-cuenta.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { SeguridadComponent, PasswordDialog, ContactosDialog } from './seguridad/seguridad.component';
import { MaterialModule } from '../../../modulos/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MenuCuentaComponent,
    DatosPersonalesComponent,
    SeguridadComponent,
    PasswordDialog,
    ContactosDialog
  ],
  imports: [
    CommonModule,
    MenuCuentaRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MenuCuentaModule { }
