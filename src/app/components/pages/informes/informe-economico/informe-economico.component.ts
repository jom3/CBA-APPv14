import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EgresosService } from '../../../../servicios/egresos.service';
import { IngresosService } from '../../../../servicios/ingresos.service';
import { LocationStrategy } from '@angular/common';
import { ProyectosService } from '../../../../servicios/proyectos.service';

import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CambioService } from '../../../../servicios/cambio.service';
import { PersonasService } from '../../../../servicios/personas.service';
@Component({
  selector: 'app-informe-economico',
  templateUrl: './informe-economico.component.html',
  styleUrls: ['./informe-economico.component.css'],
})
export class InformeEconomicoComponent implements OnInit {
  generado:any;
  egresos!: any;
  persona: any;
  codper:any;
  ingresos!: any;
  proyecto!: any;
  codpro = this.ac.snapshot.params.codpro;
  todo: any;
  todo2: any;
  totales: any;
  rol: any;
  totalebs:any;
  totaleds:any;
  totalibs:any;
  totalids:any;
  todos:any;
  cm:any;
  cambio:any;
  constructor(
    private ac: ActivatedRoute,
    private es: EgresosService,
    private is: IngresosService,
    private location: LocationStrategy,
    private ps: ProyectosService,
    private cs: CambioService,
    private router: Router,
    private prs:PersonasService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('rol')) {
      this.rol = localStorage.getItem('rol');
    }
    if (this.codpro) {
      this.listarCambio();
      this.listarEgresosbyProyecto(this.codpro);
      this.listarProyecto(this.codpro);
      this.generado = new Date();
      this.codper = localStorage.getItem('codigo');
      this.listarPersona(this.codper);
    } else {
      this.location.back();
    }
  }
  listarPersona(codper:number){
    this.prs.listarPersona(codper).subscribe(res=>{
      this.persona = res;
    })
  }
  listarProyecto(codpro: number) {
    this.ps.listarProyecto(codpro).subscribe((res) => {
      this.proyecto = res;
    });
  }
  listarCambio(){
    this.cs.obtenerCambio().subscribe(res=>{
      this.cm= res;
      this.cambio = this.cm.quotes.USDBOB;
    })
  }
  listarEgresosbyProyecto(codpro: number) {
    this.es.listarEgresosbyProyecto(codpro).subscribe((res) => {
      this.egresos = res;
      let sumEgresos = 0;
      for (let i = 0; i < this.egresos.length; i++) {
        if (this.egresos[i].edivisa == 'Bolivianos') {
          sumEgresos = sumEgresos + this.egresos[i].retiro;
        } else if (this.egresos[i].edivisa == 'Dolares') {
          let came = this.egresos[i].retiro * this.egresos[i].cambio;
          sumEgresos = sumEgresos + came;
        }
      }
      this.totalebs = sumEgresos;
      this.totaleds = sumEgresos / this.cambio;

      this.is.listarIngresosbyProyecto(codpro).subscribe((res) => {
        this.ingresos = res;
        let sumIngresos = 0;
        for (let i = 0; i < this.ingresos.length; i++) {
          if (this.ingresos[i].idivisa == 'Bolivianos') {
            sumIngresos = sumIngresos + this.ingresos[i].ingreso;
          } else if (this.ingresos[i].idivisa == 'Dolares') {
            let cam = this.ingresos[i].ingreso * this.ingresos[i].cambio;
            sumIngresos = sumIngresos + cam;
          }
          this.totalibs = sumIngresos;
          this.totalids = sumIngresos / this.cambio;
          this.todos = this.totalibs - this.totalebs;
        }
      });
    });
  }
  downloadPDF() {
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
    };

    html2canvas(DATA, options)
    .then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(
        img,
        'PNG',
        bufferX,
        bufferY,
        pdfWidth,
        pdfHeight,
        undefined,
        'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`${new Date().toISOString()}_informe_ingreso.pdf`);
      });
    }
    verProyecto(){
      this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);
    }
}
