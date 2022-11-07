import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformeProyectoComponent } from './informe-proyecto/informe-proyecto.component';
import { InformeEgresosComponent } from './informe-egresos/informe-egresos.component';
import { InformeIngresosComponent } from './informe-ingresos/informe-ingresos.component';
import { InformeEncargadosComponent } from './informe-encargados/informe-encargados.component';
import { InformeEconomicoComponent } from './informe-economico/informe-economico.component';
import { InformeEjecucionComponent } from './informe-ejecucion/informe-ejecucion.component';
import { InformeTareasComponent } from './informe-tareas/informe-tareas.component';

const routes: Routes = [
  {path:'', children:[
    {path:'proyectos', component:InformeProyectoComponent},
    {path:'tareas', component:InformeTareasComponent},
    {path:'tareas/:codpro', component:InformeTareasComponent},
    {path:'egresos/:codpro', component:InformeEgresosComponent},
    {path:'ingresos/:codpro', component:InformeIngresosComponent},
    {path:'encargados', component:InformeEncargadosComponent},
    {path:'economico/:codpro', component:InformeEconomicoComponent},
    {path:'ejecucion/:codpro', component:InformeEjecucionComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformesRoutingModule { }
