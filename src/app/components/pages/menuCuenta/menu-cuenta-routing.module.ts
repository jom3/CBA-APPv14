import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuCuentaComponent } from './menu-cuenta/menu-cuenta.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { SeguridadComponent } from './seguridad/seguridad.component';

const routes: Routes = [{
  path:'', children:[
    {path:'informacion-personal/:codper', component: DatosPersonalesComponent},
    {path:'seguridad/:codper', component: SeguridadComponent},
    {path:':codper', component:MenuCuentaComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuCuentaRoutingModule { }
