import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquiposService } from '../../../../servicios/equipos.service';
import { LoginService } from '../../../../servicios/login.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  equipos:any;
  filtroEquipos = '';
  p: number = 1;
  codper:number;

  constructor(
    private eq: EquiposService,
    private ls: LoginService,
    private location: LocationStrategy,
    private router:Router,
    private ac: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(this.ac.snapshot.paramMap.get('codper')){
      this.codper = parseInt(this.ac.snapshot.paramMap.get('codper'));
      this.listarEquiposbyPersonal(this.codper);
  }else{
    this.listarEquipos();
  }
  }
  listarEquipos(){
    this.eq.listarEquipos().subscribe(res=>{
      this.equipos = res;
    })
  }
  listarEquiposbyPersonal(codper:number){
    this.eq.listarEquiposbyPersonal(this.codper).subscribe(res=>{
      this.equipos = res;
    })
  }
}
