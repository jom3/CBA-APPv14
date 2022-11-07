import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegLogeoComponent } from '../pages/personas/reg-logeo/reg-logeo.component';
import { LoginComponent } from './login/login.component';
import { RegUsuarioComponent } from './reg-usuario/reg-usuario.component';
import { RecuperacionComponent } from './recuperacion/recuperacion.component';

const routes: Routes = [
  {path:'', children:[
    {path:'',component:LoginComponent},
    {path:'registrarUsuario',component:RegUsuarioComponent},
    {path:'registrarDatos/:codper', component:RegLogeoComponent},
    {path:'recuperar', component:RecuperacionComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
