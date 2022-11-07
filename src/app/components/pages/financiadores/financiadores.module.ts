import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanciadoresRoutingModule } from './financiadores-routing.module';
import { FinanciadoresComponent } from './financiadores/financiadores.component';
import { RegFinanciadoresComponent } from './reg-financiadores/reg-financiadores.component';
import { VerFinanciadoresComponent } from './ver-financiadores/ver-financiadores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modulos/material.module';
import { FinanciadoresPipe } from './financiadores.pipe';


@NgModule({
  declarations: [
    FinanciadoresComponent,
    RegFinanciadoresComponent,
    VerFinanciadoresComponent,
    FinanciadoresPipe
  ],
  imports: [
    CommonModule,
    FinanciadoresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class FinanciadoresModule { }
