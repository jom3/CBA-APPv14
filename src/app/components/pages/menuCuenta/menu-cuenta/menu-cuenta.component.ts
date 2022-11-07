import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { LoginService } from '../../../../servicios/login.service';

@Component({
  selector: 'app-menu-cuenta',
  templateUrl: './menu-cuenta.component.html',
  styleUrls: ['./menu-cuenta.component.css']
})
export class MenuCuentaComponent implements OnInit {
  codper:number = parseInt(this.ac.snapshot.paramMap.get('codper'));
  codigo:number;
  constructor(
    private router: Router,
    private ac: ActivatedRoute,
    private location: LocationStrategy,
    private ls: LoginService
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('codigo')){
      this.codigo = parseInt(localStorage.getItem('codigo'));
      if(this.codigo!=this.codper){
        this.ls.logout();
      }
    }
  }
  seguridad(){
    this.router.navigate([`/cuenta/seguridad/${this.codper}`])
  }
  datosPersonales(){
    this.router.navigate([`/cuenta/informacion-personal/${this.codper}`])
  }
}
