import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonasRoutingModule } from './personas-routing.module';
import { PersonasComponent } from './personas/personas.component';
import { RegPersonasComponent } from './reg-personas/reg-personas.component';
import { MaterialModule } from '../../../modulos/material.module';
import { VerPersonasComponent } from './ver-personas/ver-personas.component';
import { CommonModule } from '@angular/common';
import { PersonasPipe } from './personas.pipe';
import { RegLogeoComponent } from './reg-logeo/reg-logeo.component';


@NgModule({
  declarations: [
    PersonasComponent,
    RegPersonasComponent,
    VerPersonasComponent,
    PersonasPipe,
    RegLogeoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PersonasRoutingModule,
    MaterialModule,
  ]
})
export class PersonasModule { }
