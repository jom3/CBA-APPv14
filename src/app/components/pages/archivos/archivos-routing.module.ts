import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivosComponent } from './archivos/archivos.component';
import { RegArchivoComponent } from './reg-archivo/reg-archivo.component';
import { VerArchivoComponent } from './ver-archivo/ver-archivo.component';

const routes: Routes = [
  {path:'', children:[
    {path:'', component:ArchivosComponent},
    {path:'verArchivo/:codarc', component: VerArchivoComponent},
    {path:'registrarArchivo/:codpro', component: RegArchivoComponent},
    {path:'modificarArchivo/:codarc', component: RegArchivoComponent},
    {path:':codpro', component:ArchivosComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivosRoutingModule { }
