import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MainModule } from './modulos/main.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { XsegundoService } from './servicios/reloj.service';
import { LoginModule } from './components/login/login.module';
import { ConectadoComponent } from './components/pie/conectado/conectado.component';

import {DatePipe} from '@angular/common';
import { AuthGuardGuard } from './modulos/auth-guard.guard';
import { CheckLoginGuard } from './modulos/check-login.guard';
import { RolesDirectiveDirective } from './roles-directive.directive';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { MenuModule } from './components/pages/menu/menu.module';
@NgModule({
  declarations: [
    AppComponent,
    ConectadoComponent,
    RolesDirectiveDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    MainModule,
    NgxPaginationModule,
    MenuModule
  ],
  providers: [
    XsegundoService,
    DatePipe,
    CheckLoginGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
