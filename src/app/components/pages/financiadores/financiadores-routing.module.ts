import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanciadoresComponent } from './financiadores/financiadores.component';
import { RegFinanciadoresComponent } from './reg-financiadores/reg-financiadores.component';
import { VerFinanciadoresComponent } from './ver-financiadores/ver-financiadores.component';

const routes: Routes = [
  {path:'', children:[
    {path:'',component:FinanciadoresComponent},
    {path:'registrarFinanciador', component:RegFinanciadoresComponent},
    {path:'modificarFinanciador/:codf', component:RegFinanciadoresComponent},
    {path:'verFinanciador/:codf', component:VerFinanciadoresComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanciadoresRoutingModule { }
