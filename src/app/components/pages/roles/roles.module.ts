import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RegRolesComponent } from './reg-roles/reg-roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modulos/material.module';
import { RolesComponent } from './roles/roles.component';
import { RolesPipe } from './roles.pipe';


@NgModule({
  declarations: [
    RegRolesComponent,
    RolesComponent,
    RolesPipe
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class RolesModule { }
