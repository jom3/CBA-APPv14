import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstitucionesService } from '../../../../servicios/instituciones.service';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit {
  instituciones:any;
  filtroInstituciones = '';
  p: number = 1;
  rol:any;
  constructor(
    private router:Router,
    private is: InstitucionesService,
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem('rol')){
      this.rol= localStorage.getItem('rol');
    }
    this.listarInstituciones();
  }
  listarInstituciones(){
    this.is.listarInstituciones().subscribe(res=>{
      this.instituciones = res;
    })
  }
  registrarNuevo(){
    this.router.navigate(['/instituciones/registrarInstitucion'])
  }
}
