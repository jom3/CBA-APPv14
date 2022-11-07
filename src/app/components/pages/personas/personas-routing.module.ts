import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasComponent } from './personas/personas.component';
import { RegPersonasComponent } from './reg-personas/reg-personas.component';
import { VerPersonasComponent } from './ver-personas/ver-personas.component';
import { AuthGuardGuard } from '../../../modulos/auth-guard.guard';
import { RegLogeoComponent } from './reg-logeo/reg-logeo.component';

const routes: Routes = [
  {path:'', children:[
    {path:'', component:PersonasComponent },
    {path:'registrarPersona', component:RegPersonasComponent},
    {path:'modificarPersona/:codper', component:RegPersonasComponent},
    {path:'verPersona/:codper', component:VerPersonasComponent},
    {path:'registrarDatos/:codper', component:RegLogeoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule { }
