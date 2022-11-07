import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInstitucionesComponent } from './ver-instituciones.component';

describe('VerInstitucionesComponent', () => {
  let component: VerInstitucionesComponent;
  let fixture: ComponentFixture<VerInstitucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerInstitucionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerInstitucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
