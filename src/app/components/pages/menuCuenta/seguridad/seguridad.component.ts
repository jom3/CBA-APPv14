import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../../servicios/login.service';
import { LocationStrategy } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css'],
})
export class SeguridadComponent implements OnInit {
  codper: number = parseInt(this.ac.snapshot.paramMap.get('codper'));
  token: string = localStorage.getItem('token');
  codigo: number;
  constructor(
    private ac: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private router: Router,
    private location: LocationStrategy,
    private ls: LoginService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('codigo')) {
      this.codigo = parseInt(localStorage.getItem('codigo'));
      if (this.codigo != this.codper) {
        this.ls.logout();
      } else {
      }
    }
  }

  CambiarPasswordDialog() {
    const dialogRef = this.dialog.open(PasswordDialog, {
      data: this.codper,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  ContactosDialog() {
    const dialogRef = this.dialog.open(ContactosDialog);
    dialogRef.afterClosed().subscribe((result) => {});
  }
}

@Component({
  selector: 'password-dialog',
  templateUrl: 'password-dialog.html',
  styleUrls: ['password-dialog.css'],
})
export class PasswordDialog implements OnInit {
  durationInSeconds = 1000;
  mensaje:any;
  cpForm: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private ls: LoginService,
    private sBar: MatSnackBar,
    private ac: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.cpForm = this.fb.group({
      correo: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      pass1: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],
      pass2: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],
    });
  }
  getErrorMessage(campo: string) {
    let message;
    if (this.cpForm.get(campo)?.errors?.required) {
      message = 'campo requerido';
    } else if (this.cpForm.get(campo)?.hasError('minlength')) {
      const minLength =
        this.cpForm.get(campo)?.errors?.minlength.requiredLength;
      message = `introduzca mas de ${minLength} caracteres.`;
    } else if (this.cpForm.get(campo)?.hasError('maxlength')) {
      const maxLength =
        this.cpForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `introduzca menos de ${maxLength} caracteres.`;
    } else if (this.cpForm.get(campo)?.hasError('pattern')) {
      message = 'valor no valido.';
    } else if (this.validarContraseña() == false) {
      message = 'la contraseñas son diferentes';
    }
    return message;
  }
  validarContraseña() {
    if (this.cpForm.controls.pass1.value != this.cpForm.controls.pass2.value) {
      return false;
    } else {
      return true;
    }
  }

  campoValido(campo: string): boolean {
    return (
      (this.cpForm.get(campo)?.touched || this.cpForm.get(campo)!.dirty) &&
      !this.cpForm.get(campo)?.valid
    );
  }
  guardar() {
    const passData = this.cpForm.value;
    this.ls.cambiarPassword(passData, this.data).subscribe((res) => {
      this.mensaje = res;
          this.sBar.open(this.mensaje.mensaje,'',
          {
            duration: 5*this.durationInSeconds,
            horizontalPosition:"end",
            panelClass: ['snackbar']
          });
    });
  }
}
@Component({
  selector: 'contactos-dialog',
  templateUrl: 'contactos-dialog.html',
  styleUrls: ['contactos-dialog.css'],
})
export class ContactosDialog implements OnInit {
  cpForm: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private ls: LoginService,
    private ac: ActivatedRoute
  ) {}
  ngOnInit(): void {}
}
