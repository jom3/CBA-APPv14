import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PersonasService } from 'src/app/servicios/personas.service';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { TareasService } from 'src/app/servicios/tareas.service';

@Component({
  selector: 'app-informe-tareas',
  templateUrl: './informe-tareas.component.html',
  styleUrls: ['./informe-tareas.component.css']
})
export class InformeTareasComponent implements OnInit {
  codpro:number;
  persona: any;
  codper:any;
  generado:any;
  proyecto:any;
  tareas:any;
  contador:any;
  val1:any;
  val2:any;
  totalt:any;
  totala:any;
  totalc:any;
  constructor(
    private ps: ProyectosService,
    private ts: TareasService,
    private ac: ActivatedRoute,
    private router: Router,
    private location: LocationStrategy,
    private prs:PersonasService
  ) { }

  ngOnInit(): void {
    if(this.ac.snapshot.paramMap.get('codpro')){
      this.codpro = parseInt(this.ac.snapshot.paramMap.get('codpro'));
      this.listarProyecto(this.codpro);
      this.listarHisTar(this.codpro);
      this.generado = new Date();
      this.codper = localStorage.getItem('codigo');
      this.listarPersona(this.codper);
  }
      //   }else{
        //     this.verTareas(this.codpro);
        //     this.listarTareas(this.codpro);
        //     this.location.back();
  //   }
  }
  listarPersona(codper:number){
    this.prs.listarPersona(codper).subscribe(res=>{
      this.persona = res;
    })
  }
  listarProyecto(codpro:number){
    this.ps.listarProyecto(codpro).subscribe(res=>{
      this.proyecto = res;
    })
  }
  listarHisTar(codpro:number){
    this.ts.listarHistorialbyProyecto(codpro).subscribe(res=>{
      this.tareas = res;
    })
  }
  // listarTareas(codpro: number){
  //   this.ts.listarTareasbyProyecto(codpro).subscribe(res=>{
  //     this.tareas = res;
  //     console.log(this.tareas)
  //   })
  // }
  // verTareas(codpro:number){
  //   this.ts.listarTotalTareas(codpro).subscribe(res=>{
  //     this.contador=res;
  //     this.totalt = this.contador[0].count;
  //     this.ts.listarTareasActivas(codpro).subscribe(res=>{
  //       this.val1 = res;
  //       this.totala = this.val1[0].count;
  //       this.ts.listarTareasCompletadas(codpro).subscribe(res=>{
  //         this.val2 = res;
  //         this.totalc = this.val2[0].count;
  //       })
  //     })
  //   })
  // }
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
  verProyecto(){
    this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);
  }
}
