import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../servicios/login.service';
import { RolesService } from '../servicios/roles.service';
import { LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate{
  rol:any;
  ress: any;
  codper: any;
  estatus:any;
  constructor(
    private ls:LoginService,
    private router: Router,
    private rs: RolesService,
    private location:LocationStrategy
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean | Promise<boolean>{
      if (this.ls.islogged()) {
        this.router.navigateByUrl('/proyectos');
        return false;
    }
    return true;
  }
}
