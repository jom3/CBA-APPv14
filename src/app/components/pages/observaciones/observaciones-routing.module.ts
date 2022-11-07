import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObservacionesComponent } from './observaciones/observaciones.component';
import { RegObservacionesComponent } from './reg-observaciones/reg-observaciones.component';

const routes: Routes = [
  {path:'', children:[
    {path:'', component:ObservacionesComponent},
    {path:'misObservaciones/:codper', component:ObservacionesComponent},
    {path:'registrarObservacion/:codpro', component:RegObservacionesComponent},
    {path:'modificarObservacion/:codo', component:RegObservacionesComponent},
    {path:':codpro', component:ObservacionesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservacionesRoutingModule { }
