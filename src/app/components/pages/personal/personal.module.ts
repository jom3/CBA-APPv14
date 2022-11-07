import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRoutingModule } from './personal-routing.module';
import { VerPersonalComponent } from './ver-personal/ver-personal.component';
import { PersonalComponent } from './personal/personal.component';
import { PersonalPipe } from './personal.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modulos/material.module';
import { RegPersonalComponent } from './reg-personal/reg-personal.component';
import { ModificarPersonalComponent } from './modificar-personal/modificar-personal.component';


@NgModule({
  declarations: [
    VerPersonalComponent,
    PersonalComponent,
    PersonalPipe,
    RegPersonalComponent,
    ModificarPersonalComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class PersonalModule { }
