import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficiariosComponent } from './beneficiarios/beneficiarios.component';
import { RegBeneficiarioComponent } from './reg-beneficiario/reg-beneficiario.component';

const routes: Routes = [
  {path:'', children:[
    {path:'', component:BeneficiariosComponent},
    {path:'registrarBeneficiario/:codpro', component: RegBeneficiarioComponent},
    {path:'misPostulaciones/:codper', component:BeneficiariosComponent},
    {path:':codpro', component:BeneficiariosComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiariosRoutingModule { }
