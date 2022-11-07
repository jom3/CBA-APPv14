import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
exports:[
  FlexLayoutModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatDividerModule,
  MatSelectModule,
  MatCardModule,
  MatDialogModule,
  MatTooltipModule,
  MatPaginatorModule,
  NgxPaginationModule,
  MatSnackBarModule,
  MatTabsModule,
  MatStepperModule,
  NgxMatFileInputModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatRadioModule
]
})
export class MaterialModule { }
