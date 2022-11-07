import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../../../servicios/proyectos.service';
import { LocationStrategy } from '@angular/common';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PersonasService } from 'src/app/servicios/personas.service';
import { CambioService } from 'src/app/servicios/cambio.service';
import { TiposProyectosService } from '../../../../servicios/tipos-proyectos.service';

@Component({
  selector: 'app-informe-proyecto',
  templateUrl: './informe-proyecto.component.html',
  styleUrls: ['./informe-proyecto.component.css']
})
export class InformeProyectoComponent implements OnInit {
  generado:any;
  tproyectos:any;
  persona:any;
  codper:any;
  proyectos:any;
  ress: any;
  cambio:any;
  rol:any;
  opcion:any;
  f1:any;
  f2:any;
  constructor(
    private pr: ProyectosService,
    private location: LocationStrategy,
    private prs:PersonasService,
    private cs: CambioService,
    private tp: TiposProyectosService
  ) {
  }
  ngOnInit(): void {
    this.generado = new Date();
    this.codper = localStorage.getItem('codigo');
    this.listarPersona(this.codper);
    this.listarTipos();
    this.cs.obtenerCambio().subscribe(res=>{
      this.ress = res;
      this.cambio = this.ress.quotes.USDBOB;
      });
    if(localStorage.getItem('rol')){
      this.rol= localStorage.getItem('rol');
    }
    this.listarProyectosInformes();
  }
  listarPersona(codper:number){
    this.prs.listarPersona(codper).subscribe(res=>{
      this.persona = res;
    })
  }
  obtenerValor(event:any){
    console.log(event.target.value)
    this.pr.listarProyectosInformesbyTipo(event.target.value).subscribe(res=>{
      this.proyectos = res;
    })
  }
  obtenerFecha(event:any){
    this.f1 = event.target.value;
  }
  obtenerFecha2(event:any){
    this.f2 = event.target.value;
  }
  fechas(){
    let arr = {f1:this.f1,f2:this.f2}
    console.log(arr)
    this.pr.listarProyectosInformesbyFechas(arr).subscribe(res=>{
      this.proyectos = res
    })
  }
  buscar(event){
    if(event.source.value==1){
      this.opcion = 1;
    }else if(event.source.value==2){
      this.opcion = 2;
    }
  }
  listarTipos(){
    this.tp.listarTipos().subscribe(res=>{
      this.tproyectos = res;
    })
  }
  // tslint:disable-next-line:typedef
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
      docResult.save(`${new Date().toISOString()}_informe_proyecto.pdf`);
    });
  }

  listarProyectosInformes(){
    this.pr.listarProyectosInformes().subscribe(res=>{
      this.proyectos = res;
    })
  }
}
