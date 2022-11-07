import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../../../servicios/proyectos.service';
import { IngresosService } from '../../../../servicios/ingresos.service';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PersonasService } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-informe-ingresos',
  templateUrl: './informe-ingresos.component.html',
  styleUrls: ['./informe-ingresos.component.css']
})
export class InformeIngresosComponent implements OnInit {
  ingresos!:any;
  persona: any;
  codper:any;
  generado:any;
  proyecto!:any;
  todo:any;
  totalBs:number;
  totalDs:number;
  cambio:any;
  codpro = this.ac.snapshot.params.codpro;
  constructor(
    private pr:ProyectosService,
    private is: IngresosService,
    private location: LocationStrategy,
    private ac:ActivatedRoute,
    private router: Router,
    private prs:PersonasService
  ) { }

  ngOnInit(): void {
    this.generado = new Date();
    if(this.codpro){
      this.listarIngresosbyProyecto(this.codpro);
      this.listarProyecto(this.codpro);
      this.cambio = localStorage.getItem('cambio');
      this.codper = localStorage.getItem('codigo');
      this.listarPersona(this.codper);
    }else{
      this.location.back();
    }
  }
  listarPersona(codper:number){
    this.prs.listarPersona(codper).subscribe(res=>{
      this.persona = res;
    })
  }
  listarIngresosbyProyecto(codpro:number){
    this.is.listarIngresosbyProyecto(codpro).subscribe(res=>{
        this.ingresos=res;
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
  totales(codpro:number){
    this.is.TotalIngresos(codpro).subscribe(res=>{
      this.todo = res;
    })
  }
  listarProyecto(codpro:number){
    this.pr.listarProyecto(codpro).subscribe(res=>{
      this.proyecto = res;
    })
  }
  verProyecto(){
    this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);
    localStorage.removeItem('codpro');
    localStorage.removeItem('cambio');
  }
  volver(){
    this.location.back();
  }
  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_informe_ingreso.pdf`);
    });
  }
}
