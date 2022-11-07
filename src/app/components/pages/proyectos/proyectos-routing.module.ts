import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { RegProyectosComponent } from './reg-proyectos/reg-proyectos.component';
import { VerProyectoComponent } from './ver-proyecto/ver-proyecto.component';
import { CheckLoginGuard } from 'src/app/modulos/check-login.guard';

const routes: Routes = [
  {path:'', children:[
    {path:'', component:ProyectosComponent, pathMatch:'full'},
    {path:'registrarProyecto', component:RegProyectosComponent, canActivate:[CheckLoginGuard]},
    {path:'modificarProyecto/:codpro', component:RegProyectosComponent, canActivate:[CheckLoginGuard]},
    {path:'verProyecto/:codpro', component:VerProyectoComponent, canActivate:[CheckLoginGuard]},
    {path:':codper', component:ProyectosComponent, canActivate:[CheckLoginGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }
