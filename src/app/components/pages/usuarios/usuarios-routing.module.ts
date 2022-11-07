import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { RegUsuarioComponent } from '../../login/reg-usuario/reg-usuario.component';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';

const routes: Routes = [
  {path:'', children:[
    {path:'',component:UsuariosComponent},
    {path:'registrarUsuario',component:RegUsuarioComponent},
    {path:'verUsuario/:codper',component:VerUsuariosComponent},
    {path:'modificarUsuario/:codper',component:ModificarUsuarioComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
