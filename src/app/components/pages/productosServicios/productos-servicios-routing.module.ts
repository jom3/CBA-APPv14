import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosServiciosComponent } from './productos-servicios/productos-servicios.component';
import { RegProductoservicioComponent } from './reg-productoservicio/reg-productoservicio.component';
import { VerProductoServicioComponent } from './ver-producto-servicio/ver-producto-servicio.component';

const routes: Routes = [
  {path:'', children:[
    {path:'',component:ProductosServiciosComponent},
    {path:'registrarProductoServicio', component:RegProductoservicioComponent},
    {path:'modificarProductoServicio/:codps', component:RegProductoservicioComponent},
    {path:'verProductoServicio/:codps', component:VerProductoServicioComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosServiciosRoutingModule { }
