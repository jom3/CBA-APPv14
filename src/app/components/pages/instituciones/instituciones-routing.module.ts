import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitucionesComponent } from './instituciones/instituciones.component';
import { RegInstitucionesComponent } from './reg-instituciones/reg-instituciones.component';
import { VerInstitucionesComponent } from './ver-instituciones/ver-instituciones.component';

const routes: Routes = [
  {path:'', children:[
    {path:'', component:InstitucionesComponent},
    {path:'registrarInstitucion', component:RegInstitucionesComponent},
    {path:'modificarInstitucion/:codi', component:RegInstitucionesComponent},
    {path:'verInstitucion/:codi', component: VerInstitucionesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitucionesRoutingModule { }
