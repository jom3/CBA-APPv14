import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../modulos/material.module';
import { RegUsuarioComponent } from './reg-usuario/reg-usuario.component';
import { RecuperacionComponent } from './recuperacion/recuperacion.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegUsuarioComponent,
    RecuperacionComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class LoginModule { }
