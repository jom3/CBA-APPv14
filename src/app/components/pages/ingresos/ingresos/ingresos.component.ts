import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IngresosService } from '../../../../servicios/ingresos.service';
import { LocationStrategy } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../../../servicios/proyectos.service';
import { CambioService } from '../../../../servicios/cambio.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {
  proyecto: any;
  ingresos!:any;
  filtroIngresos = '';
  ingForm!:UntypedFormGroup;
  codpro = this.ac.snapshot.params.codpro;
  p: number = 1;
  todo:any;
  ress: any;
  cambio:any;
  pestado!:boolean;
  bolivianos:number;
  dolares:number;
  totalBs:number;
  totalDs:number;
  constructor(
    private fb: UntypedFormBuilder,
    private is: IngresosService,
    private location: LocationStrategy,
    private router:Router,
    private ac: ActivatedRoute,
    private ps: ProyectosService,
    private cs: CambioService
  ) { }

  ngOnInit(): void {
    console.log(this.router.url)
    this.ingForm = this.fb.group({
      coding: ['',[Validators.required]],
      codf: ['',[Validators.required]],
      codpro: ['',[Validators.required]],
      ingreso: ['',[Validators.required]],
      idivisa: ['',[Validators.required]],
      cingreso: ['',[Validators.required]],
      fingreso: ['',[Validators.required]],
    });
    if(this.codpro){
      this.listarIngresosbyProyecto(this.codpro);
      this.cs.obtenerCambio().subscribe(res=>{
        this.ress = res;
        this.cambio = this.ress.quotes.USDBOB;
        localStorage.setItem('cambio',this.cambio);
        this.listarProyecto(this.codpro);
      })
      localStorage.setItem('codpro',this.codpro)
      // this.totales(this.codpro);
      this.listarProyecto(this.codpro);
  }else{
    this.listarIngresos();
    localStorage.removeItem('codpro')
  }
  }
  listarIngresos(){
    this.is.listarIngresos().subscribe(res=>{
      this.ingresos=res;
    })
  }
  listarProyecto(codpro: number){
    this.ps.listarProyecto(codpro).subscribe(res=>{
      this.proyecto = res;
      if(this.proyecto[0].divisa=='Dolares'){
        this.dolares = parseFloat(this.proyecto[0].costo_proyecto);
        this.bolivianos = parseFloat(this.proyecto[0].costo_proyecto)* this.cambio;
      }else{
        this.dolares = parseFloat(this.proyecto[0].costo_proyecto)/ this.cambio;
        this.bolivianos = parseFloat(this.proyecto[0].costo_proyecto);
      }
    })
  }
  totales(codpro:number){
    this.is.TotalIngresos(codpro).subscribe(res=>{
      this.todo = res;
    })
  }
  listarIngresosbyProyecto(codpro:number){
    this.is.listarIngresosbyProyecto(codpro).subscribe(res=>{
      this.ingresos = res;
      let sumIngresos = 0;
      for(let i=0;i<this.ingresos.length;i++){
        if(this.ingresos[i].idivisa=='Bolivianos'){
         sumIngresos = sumIngresos + this.ingresos[i].ingreso;
        }else if(this.ingresos[i].idivisa=='Dolares'){
          let cam = this.ingresos[i].ingreso * this.ingresos[i].cambio;
          sumIngresos = sumIngresos + cam;
      }
        this.totalBs = sumIngresos;
        this.totalDs = sumIngresos / this.cambio;
      }
    })
  }
  registrarNuevo(){
    this.router.navigate([`/ingresos/registrarIngreso/${this.codpro}`])
  }
  verInforme(){
    this.router.navigate([`/informes/ingresos/${this.codpro}`])
  }

  //otro
  verProyecto(){
    this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);
    localStorage.removeItem('codpro');
    localStorage.removeItem('cambio');
  }
}
