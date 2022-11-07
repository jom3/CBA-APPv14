import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../../servicios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios:any;
  filtroUsuarios = '';
  p: number = 1;
  constructor(
    private us:UsuariosService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.listarUsuarios();
}
  registrarNuevo(){
    this.router.navigate(['/usuarios/registrarUsuario'])
  }
  listarUsuarios(){
    this.us.listarUsuarios().subscribe(res =>{
      this.usuarios = res;
      })
  }
}
