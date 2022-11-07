import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresosComponent } from './ingresos/ingresos.component';
import { RegIngresosComponent } from './reg-ingresos/reg-ingresos.component';
import { VerIngresosComponent } from './ver-ingresos/ver-ingresos.component';

const routes: Routes = [
  {path:'', children:[
    {path:'', component:IngresosComponent},
    {path:'registrarIngreso/:codpro', component:RegIngresosComponent},
    {path:'modificarIngreso/:coding', component:RegIngresosComponent},
    {path:'verIngreso/:coding', component:VerIngresosComponent},
    {path:':codpro',component:IngresosComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresosRoutingModule { }
