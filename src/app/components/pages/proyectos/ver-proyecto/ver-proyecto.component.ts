import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from '../../../../servicios/proyectos.service';
import { IngresosService } from '../../../../servicios/ingresos.service';
import { EgresosService } from '../../../../servicios/egresos.service';
import { TareasService } from '../../../../servicios/tareas.service';
import { DatePipe } from '@angular/common';
import { MiembrosService } from '../../../../servicios/miembros.service';
import { RolesService } from '../../../../servicios/roles.service';


@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css']
})
export class VerProyectoComponent implements OnInit{
  dTranscurridos:number;
  diasDuracion:number;
  diasFaltantes:number;
  dFaltantes:number;
  miniSegundosTranscurridos:number;
  miniSegundosFaltantes:number;
  
  diasActIni:any;
  diasIniPlan:any;
  diasPlanEje:any;
  
  tituloact:string;

  proyecto:any;
  codpro:number;

  pro:any;
  ting:any;
  tegre:any;
  itotal:any;
  etotal:any;
  total:any;
  tareas:any;
  val1:any;
  val2:any;
  totalt:any;
  totala:any;
  totalc:any;
  totale:any;
  codper:number;
  obRol:any;
  rol:any;
  ingresos:any;
  egresos:any;
  checkPro:any;
  
  constructor(
    private ac: ActivatedRoute,
    private ps:ProyectosService,
    private router: Router,
    private is: IngresosService,
    private es: EgresosService,
    private ts: TareasService,
    private rs: RolesService
  ) {}
  ngOnInit(){
    if(this.ac.snapshot.paramMap.get('codpro')){
      this.codpro = parseInt(this.ac.snapshot.paramMap.get('codpro'));
      this.codper = parseInt(localStorage.getItem('codigo'));
      this.checkStatus(this.codpro);
      this.listarProyecto(this.codpro);
      this.listarTotales(this.codpro)
      this.verTareas(this.codpro);
      this.listarRolProyecto(this.codper,this.codpro);
    }
  }
  listarProyecto(codpro:number){
    this.ps.listarProyecto(codpro).subscribe(res=>{
      this.proyecto = res;
    })
  }
  listarRolProyecto(codper:number, codpro:number){
    this.rs.listarRolProyecto(codper,codpro).subscribe(res=>{
      this.obRol = res;
      if(this.obRol.length !=0){
        this.rol = this.obRol[0].nomrol;
      }else{
        this.rol = 'Observador'
      }
    })
  }
  informeProyecto(){
    this.router.navigate([`/informes/economico/${this.codpro}`])
  }
  informeEjecucion(){
    this.router.navigate([`/informes/ejecucion/${this.codpro}`])
  }
  listarTotales(codpro:number){
    this.is.listarIngresosbyProyecto(codpro).subscribe(res=>{
      this.ingresos = res;
      this.es.listarEgresosbyProyecto(codpro).subscribe(res=>{
        this.egresos = res;
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
          this.itotal = sumIngresos;
          this.etotal = sumEgresos;
          this.total = sumIngresos - sumEgresos;
      })
    })
  }
  verTareas(codpro:number){
    this.ps.listarProyecto(codpro).subscribe(res=>{
      this.pro = res;
      this.ts.listarTotalTareas(codpro).subscribe(res=>{
        this.tareas=res;
        this.totalt = this.tareas[0].count;
        this.ts.listarTareasActivas(codpro).subscribe(res=>{
          this.val1 = res;
          this.totala = this.val1[0].count;
          this.ts.listarTareasCompletadas(codpro).subscribe(res=>{
            this.val2 = res;
            this.totalc = this.val2[0].count;
            this.totale = (parseInt(this.totalt) - (parseInt(this.totalc)+parseInt(this.totala)));
            if(this.pro[0].estado==5){
              if(this.totalt == this.totalc){
                this.ps.completarProyecto(codpro).subscribe(res=>{})
            }
            }
          })
        })
      })
    })
    }
  checkStatus(codpro:number){
    this.ps.listarProyecto(codpro).subscribe(res=>{
      this.checkPro = res;
      const {finicio,fejecucion,ffin} = this.checkPro[0];

      let minisegundos:number = 24 * 60 * 60 * 1000;
      let hoy:number = new Date().getTime();

      let fstart= new Date(finicio);
      let frunning = new Date(fejecucion);
      let fend = new Date(ffin)

      
      this.diasDuracion = Math.round((fend.getTime() - fstart.getTime())/minisegundos);
      this.diasActIni = Math.round((fstart.getTime() - hoy)/minisegundos);
      this.diasIniPlan = Math.round((frunning.getTime() - hoy)/minisegundos);
      this.diasPlanEje = Math.round((fend.getTime() - hoy)/minisegundos);

      
      if(this.diasPlanEje<0){
        this.completar(codpro);
        this.tituloact='Proyecto Completado';
      }else if(this.diasIniPlan<0){
        this.ejecucion(codpro);
        this.tituloact='Proyecto en Ejecución';
      }else if(this.diasActIni<0){
        this.planificacion(codpro);
        this.tituloact='Proyecto en Planificación';
      }else{
        this.tituloact='Proyecto Activo'
      }
    })
  }
  planificacion(codpro:number){
    this.ps.planificarProyecto(codpro).subscribe(res=>{});
  }
  ejecucion(codpro:number){
    this.ps.ejecutarProyecto(codpro).subscribe(res=>{});
  }
  completar(codpro:number){
    this.ps.completarProyecto(codpro).subscribe(res=>{});
  }
  eliminar(codpro:number){
    this.ps.eliminarProyecto(codpro).subscribe(res=>{});
  }
}
