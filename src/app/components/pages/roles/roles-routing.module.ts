import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { RegRolesComponent } from './reg-roles/reg-roles.component';

const routes: Routes = [
  {path: '', children:[
    {path: '', component:RolesComponent},
    {path: 'registrarRol', component:RegRolesComponent},
    {path: 'modificarRol/:codrol', component:RegRolesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
