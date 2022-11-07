import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EgresosService } from '../../../../servicios/egresos.service';
import { CambioService } from '../../../../servicios/cambio.service';
import { ProyectosService } from '../../../../servicios/proyectos.service';
import { IngresosService } from '../../../../servicios/ingresos.service';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css']
})
export class EgresosComponent implements OnInit {
  egresos:any;
  ingresos:any;
  filtroEgresos = '';
  egreForm!:UntypedFormGroup;
  pestado!:any;
  codpro = this.ac.snapshot.params.codpro;
  p: number = 1;
  estado=true;
  ress:any;
  cambio:any;
  todoi:any;
  todoe:any;
  proyecto:any;
  bolivianos:any;
  dolares:any;
  totalebs:any;
  totaleds:any;
  totalibs:any;
  totalids:any;
  constructor(
    private fb: UntypedFormBuilder,
    private es: EgresosService,
    private location: LocationStrategy,
    private router:Router,
    private ac: ActivatedRoute,
    private cs: CambioService,
    private ps: ProyectosService,
    private is:IngresosService
  ) { }

  ngOnInit(): void {
    this.egreForm = this.fb.group({
      codegre: ['',[Validators.required]],
      codper: ['',[Validators.required]],
      codpro: ['',[Validators.required]],
      retiro: ['',[Validators.required]],
      edivisa: ['',[Validators.required]],
      cegreso: ['',[Validators.required]],
      fretiro: ['',[Validators.required]],
    });
  if(this.codpro){
    this.cs.obtenerCambio().subscribe(res=>{
      this.ress = res;
      this.cambio = this.ress.quotes.USDBOB;
      localStorage.setItem('cambio',this.cambio);
    })
    this.listarProyecto(this.codpro)
    // this.totalesi(this.codpro);
    // this.totalese(this.codpro);
    this.listarEgresosbyProyecto(this.codpro);
  }else{
    this.listarEgresos();
  }
  }
  listarEgresos(){
    this.es.listarEgresos().subscribe(res=>{
      this.egresos=res;
    })
  }
  listarEgresosbyProyecto(codpro:number){
    this.es.listarEgresosbyProyecto(codpro).subscribe(res=>{
        this.egresos=res;
        this.is.listarIngresosbyProyecto(codpro).subscribe(res=>{
          this.ingresos = res;
          let sumIngresos = 0;
          let sumEgresos = 0;
          for (let i = 0; i < this.ingresos.length; i++) {
            if (this.ingresos[i].idivisa == 'Bolivianos') {
              sumIngresos = sumIngresos + this.ingresos[i].ingreso;
            } else if (this.ingresos[i].idivisa == 'Dolares') {
              let cami = this.ingresos[i].ingreso * this.ingresos[i].cambio;
              sumIngresos = sumIngresos + cami;
            }
          }
          for (let i = 0; i < this.egresos.length; i++) {
            if (this.egresos[i].edivisa == 'Bolivianos') {
              sumEgresos = sumEgresos + this.egresos[i].retiro;
            } else if (this.egresos[i].edivisa == 'Dolares') {
              let came = this.egresos[i].retiro * this.egresos[i].cambio;
              sumEgresos = sumEgresos + came;
            }
          }
          this.totalibs = sumIngresos;
          this.totalids = sumIngresos / this.cambio;
          this.totalebs = sumEgresos;
          this.totaleds = sumEgresos / this.cambio;
        })
    })
  }
  totalesi(codpro:number){
    this.is.TotalIngresos(codpro).subscribe(res=>{
      this.todoi = res;
    })
  }
  totalese(codpro:number){
    this.es.TotalEgresos(codpro).subscribe(res=>{
      this.todoe = res;
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
  registrarNuevo(){
    this.router.navigate([`/egresos/registrarEgreso/${this.codpro}`])
  }
  verInforme(){
    this.router.navigate([`/informes/egresos/${this.codpro}`])
  }
  verProyecto(){
    this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);
  }
}
