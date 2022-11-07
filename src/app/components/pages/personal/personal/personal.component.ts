import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalService } from '../../../../servicios/personal.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  personales:any;
  filtroPersonal = '';
  p: number = 1;
  constructor(
    private ps:PersonalService,
    private router:Router
    ){}
  ngOnInit(): void {
    this.listarPersonales();
}
  registrarNuevo(){
    this.router.navigate(['/personal/registrarPersonal'])
  }
  listarPersonales(){
    this.ps.listarPersonales().subscribe(resp =>{
      this.personales = resp;
      })
  }
}
