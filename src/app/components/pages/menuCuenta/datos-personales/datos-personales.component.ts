import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../../servicios/login.service';
import { LocationStrategy } from '@angular/common';
import { PersonasService } from '../../../../servicios/personas.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  codper: number = parseInt(this.ac.snapshot.paramMap.get('codper'));
  codigo: number;
  persona!:any;
  imagen!:any;
  constructor(
    private  ac: ActivatedRoute,
    private router: Router,
    private location: LocationStrategy,
    private ls: LoginService,
    private ps: PersonasService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('codigo')){
      this.codigo = parseInt(localStorage.getItem('codigo'));
      if(this.codigo!=this.codper){
        this.ls.logout();
      }else{
        this.obtenerPersona(this.codper);
      }
    }
  }
  obtenerPersona(codper){
    this.ps.listarPersona(codper).subscribe(res=>{
      this.persona = res;
    })
  }
  verImagen(codper:number){
    this.ps.listarImagen(codper).subscribe(res=>{
      this.imagen = res;
    })
  }
  volver(){
    this.location.back();
  }
}
