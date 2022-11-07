import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './equipos/equipos.component';
import { VerEquiposComponent } from './ver-equipos/ver-equipos.component';
import { RegMiembroComponent } from './reg-miembro/reg-miembro.component';

const routes: Routes = [
  {path:'',children:[
    {path:'', component:EquiposComponent},
    {path:'verEquipo/:codeq', component:VerEquiposComponent},
    {path:'verEquipo/:codpro', component:VerEquiposComponent},
    {path:'registrarMiembro/:codeq', component:RegMiembroComponent},
    {path:'modificarMiembro/:codmiem', component:RegMiembroComponent},
    {path:':codper',component:EquiposComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquiposRoutingModule { }
