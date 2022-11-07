import { Component, OnInit } from '@angular/core';
import { ProductosServiciosService } from '../../../../servicios/productos-servicios.service';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-productos-servicios',
  templateUrl: './productos-servicios.component.html',
  styleUrls: ['./productos-servicios.component.css']
})
export class ProductosServiciosComponent implements OnInit {
  productosServicios:any;
  filtroPS = '';
  productos:any;
  servicios:any;
  p: number = 1;
  rol:any;

  constructor(
    private pss:ProductosServiciosService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('rol')){
      this.rol= localStorage.getItem('rol');
    }
    this.listarPs();
  }
  listarPs(){
    this.pss.listarProductosServicios().subscribe(res=>{
      this.productosServicios=res;
    })
  }
  registrarNuevo(){
    this.router.navigate(['/productosServicios/registrarProductoServicio']);
  }
}
