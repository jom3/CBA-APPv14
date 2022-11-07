import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modulos/material.module';
import { UsuariosPipe } from './usuarios.pipe';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    VerUsuariosComponent,
    UsuariosPipe,
    ModificarUsuarioComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UsuariosModule { }
