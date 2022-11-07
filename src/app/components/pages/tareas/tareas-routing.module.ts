import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareasComponent } from './tareas/tareas.component';
import { RegTareaComponent } from './reg-tarea/reg-tarea.component';
import { VerTareaComponent } from './ver-tarea/ver-tarea.component';

const routes: Routes = [
  {path:'', children:[
    {path:'', component: TareasComponent},
    {path:'registrarTarea/:codpro', component: RegTareaComponent},
    {path:'modificarTarea/:codt', component: RegTareaComponent},
    {path:'verTarea/:codt', component:VerTareaComponent},
    {path:'misTareas/:codper', component:TareasComponent},
    {path:':codpro', component: TareasComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TareasRoutingModule { }
