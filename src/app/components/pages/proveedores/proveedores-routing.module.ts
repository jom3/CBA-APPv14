import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { RegProveedoresComponent } from './reg-proveedores/reg-proveedores.component';
import { VerProveedoresComponent } from './ver-proveedores/ver-proveedores.component';

const routes: Routes = [
  {path:'', children:[
    {path:'', component:ProveedoresComponent},
    {path:'registrarProveedor', component:RegProveedoresComponent},
    {path:'modificarProveedor/:codprov', component:RegProveedoresComponent},
    {path:'verProveedor/:codprov', component:VerProveedoresComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
