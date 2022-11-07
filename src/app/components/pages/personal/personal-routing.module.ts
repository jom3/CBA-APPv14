import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './personal/personal.component';
import { RegPersonalComponent } from './reg-personal/reg-personal.component';
import { ModificarPersonalComponent } from './modificar-personal/modificar-personal.component';
import { VerPersonalComponent } from './ver-personal/ver-personal.component';

const routes: Routes = [
  {path:'',children:[
    {path:'',component:PersonalComponent},
    {path:'registrarPersonal', component:RegPersonalComponent},
    {path:'modificarPersonal/:codper', component:ModificarPersonalComponent},
    {path:'verPersonal/:codper', component:VerPersonalComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
