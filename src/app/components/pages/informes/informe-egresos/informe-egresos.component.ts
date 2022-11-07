import { Component, OnInit } from '@angular/core';
import { EgresosService } from '../../../../servicios/egresos.service';
import { ProyectosService } from '../../../../servicios/proyectos.service';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CambioService } from '../../../../servicios/cambio.service';
import { PersonasService } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-informe-egresos',
  templateUrl: './informe-egresos.component.html',
  styleUrls: ['./informe-egresos.component.css']
})
export class InformeEgresosComponent implements OnInit {
  generado:any;
  persona: any;
  codper:any;
  egresos!:any;
  proyecto!:any;
  codpro = this.ac.snapshot.params.codpro;
  todo:any;
  totalBs:any;
  totalDs:any;
  cambio:any;
  cm:any;
  constructor(
    private es: EgresosService,
    private pr:ProyectosService,
    private location:LocationStrategy,
    private ac: ActivatedRoute,
    private cs: CambioService,
    private router: Router,
    private prs:PersonasService
  ) { }

  ngOnInit(): void {
    this.generado = new Date();
    if(this.codpro){
      this.cs.obtenerCambio().subscribe(res=>{
        this.cm = res;
        this.cambio = this.cm.quotes.USDBOB
      })
      this.listarEgresosbyProyecto(this.codpro);
      this.listarProyecto(this.codpro);
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
  listarEgresosbyProyecto(codpro:number){
    this.es.listarEgresosbyProyecto(codpro).subscribe(res=>{
        this.egresos=res;
        let sumEgresos= 0;
        for (let i = 0; i < this.egresos.length; i++) {
          if (this.egresos[i].edivisa == 'Bolivianos') {
            sumEgresos = sumEgresos + this.egresos[i].retiro;
          } else if (this.egresos[i].edivisa == 'Dolares') {
            let came = this.egresos[i].retiro * this.egresos[i].cambio;
            sumEgresos = sumEgresos + came;
          }
        }
        this.totalBs = sumEgresos;
        this.totalDs = sumEgresos/ this.cambio;
    })
  }
  listarProyecto(codpro:number){
    this.pr.listarProyecto(codpro).subscribe(res=>{
      this.proyecto = res;
    })
  }
  verProyecto(){
    this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);
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
      docResult.save(`${new Date().toISOString()}_informe_egreso.pdf`);
    });
  }
}
