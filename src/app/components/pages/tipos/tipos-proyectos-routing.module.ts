import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiposProyectosComponent } from './tipos-proyectos/tipos-proyectos.component';
import { RegTiposComponent } from './reg-tipos/reg-tipos.component';

const routes: Routes = [
  {path:'',children:[
    {path:'',component:TiposProyectosComponent},
    {path:'registrarTipo',component:RegTiposComponent},
    {path:'modificarTipo/:codtipo',component:RegTiposComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposProyectosRoutingModule { }
