import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './modulos/auth-guard.guard';
import { CheckLoginGuard } from './modulos/check-login.guard';



const routes: Routes = [
  {path: '', redirectTo: '/proyectos', pathMatch: 'full'},
  {path:'personas', loadChildren:()=> import('./components/pages/personas/personas.module').then(m=>m.PersonasModule), canActivate:[CheckLoginGuard]},
  {path:'proveedores', loadChildren:()=> import('./components/pages/proveedores/proveedores.module').then(m=>m.ProveedoresModule), canActivate:[CheckLoginGuard]},
  {path:'instituciones', loadChildren:()=> import('./components/pages/instituciones/instituciones.module').then(m=>m.InstitucionesModule), canActivate:[CheckLoginGuard]},
  {path:'roles', loadChildren:()=> import('./components/pages/roles/roles.module').then(m=>m.RolesModule), canActivate:[CheckLoginGuard]},
  {path:'login', loadChildren:()=> import('./components/login/login.module').then(m=>m.LoginModule), canActivate:[AuthGuardGuard]},
  {path:'usuarios',loadChildren:()=> import('./components/pages/usuarios/usuarios.module').then(m=>m.UsuariosModule), canActivate:[CheckLoginGuard]},
  {path:'personal',loadChildren:()=> import('./components/pages/personal/personal.module').then(m=>m.PersonalModule)},
  {path:'tiposProyectos',loadChildren:()=> import('./components/pages/tipos/tipos-proyectos.module').then(m=>m.TiposProyectosModule), canActivate:[CheckLoginGuard]},
  {path:'financiadores', loadChildren:()=> import('./components/pages/financiadores/financiadores.module').then(m=>m.FinanciadoresModule), canActivate:[CheckLoginGuard]},
  {path:'productosServicios', loadChildren:()=> import('./components/pages/productosServicios/productos-servicios.module').then(m=>m.ProductosServiciosModule), canActivate:[CheckLoginGuard]},
  {path:'proyectos', loadChildren:()=> import('./components/pages/proyectos/proyectos.module').then(m=>m.ProyectosModule)},
  {path:'egresos', loadChildren:()=> import('./components/pages/egresos/egresos.module').then(m=>m.EgresosModule), canActivate:[CheckLoginGuard]},
  {path:'ingresos', loadChildren:()=> import('./components/pages/ingresos/ingresos.module').then(m=>m.IngresosModule), canActivate:[CheckLoginGuard]},
  {path:'equipos', loadChildren:()=> import('./components/pages/equipos/equipos.module').then(m=>m.EquiposModule), canActivate:[CheckLoginGuard]},
  {path:'tareas', loadChildren:()=> import('./components/pages/tareas/tareas.module').then(m=>m.TareasModule), canActivate:[CheckLoginGuard]},
  {path:'archivos', loadChildren:()=> import('./components/pages/archivos/archivos.module').then(m=>m.ArchivosModule), canActivate:[CheckLoginGuard]},
  {path:'beneficiarios', loadChildren:()=> import('./components/pages/beneficiarios/beneficiarios.module').then(m=>m.BeneficiariosModule), canActivate:[CheckLoginGuard]},
  {path:'observaciones', loadChildren:()=> import('./components/pages/observaciones/observaciones.module').then(m=>m.ObservacionesModule), canActivate:[CheckLoginGuard]},
  {path:'informes', loadChildren:()=> import('./components/pages/informes/informes.module').then(m=>m.InformesModule), canActivate:[CheckLoginGuard]},
  {path:'cuenta', loadChildren:()=> import('./components/pages/menuCuenta/menu-cuenta.module').then(m=>m.MenuCuentaModule), canActivate:[CheckLoginGuard]},
];

@NgModule({
  //para recargar la app
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
