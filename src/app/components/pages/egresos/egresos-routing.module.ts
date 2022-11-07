import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EgresosComponent } from './egresos/egresos.component';
import { VerEgresosComponent } from './ver-egresos/ver-egresos.component';
import { RegEgresoComponent } from './reg-egreso/reg-egreso.component';

const routes: Routes = [
  {path:'', children:[
    {path:'', component:EgresosComponent},
    {path:'registrarEgreso/:codpro', component:RegEgresoComponent},
    {path:'modificarEgreso/:codegre', component:RegEgresoComponent},
    {path:'verEgreso/:codegre', component:VerEgresosComponent},
    {path:':codpro',component:EgresosComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EgresosRoutingModule { }
