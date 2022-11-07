import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiariosRoutingModule } from './beneficiarios-routing.module';
import { BeneficiariosComponent } from './beneficiarios/beneficiarios.component';
import { VerBeneficiarioComponent } from './ver-beneficiario/ver-beneficiario.component';
import { RegBeneficiarioComponent } from './reg-beneficiario/reg-beneficiario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modulos/material.module';


@NgModule({
  declarations: [
    BeneficiariosComponent,
    VerBeneficiarioComponent,
    RegBeneficiarioComponent
  ],
  imports: [
    CommonModule,
    BeneficiariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class BeneficiariosModule { }
