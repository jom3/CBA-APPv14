import { Component, OnInit } from '@angular/core';
import { ArchivosService } from '../../../../servicios/archivos.service';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from '../../../../servicios/proyectos.service';

@Component({
  selector: 'app-ver-archivo',
  templateUrl: './ver-archivo.component.html',
  styleUrls: ['./ver-archivo.component.css']
})
export class VerArchivoComponent implements OnInit {
  archivo:any;
  codarc:number;
  codpro:number;
  proyecto:any;
  constructor(
    private as:ArchivosService,
    private location: LocationStrategy,
    private ac: ActivatedRoute,
    private ps: ProyectosService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(this.ac.snapshot.paramMap.get('codarc')){
      this.codarc = parseInt(this.ac.snapshot.paramMap.get('codarc'));
      this.listarArchivo(this.codarc);
    }
  }
  listarArchivo(codarc:number){
    this.as.listarArchivo(codarc).subscribe(res=>{
      this.archivo = res;
      this.codpro = this.archivo[0].codpro;
      this.listarProyecto(this.codpro)
    })
  }
  listarProyecto(codpro:number){
    this.ps.listarProyecto(codpro).subscribe(res=>{
      this.proyecto = res;
    })
  }
  bajar(codarc:number){
    window.open(`http://localhost:3000/api/archivos/bajarArchivo/${codarc}`)
  }
  cancelar(){
    this.location.back();
  }
  verProyecto(){
    this.router.navigate([`/proyectos/verProyecto/${this.codpro}`]);
  }
}
