import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeTareasComponent } from './informe-tareas.component';

describe('InformeTareasComponent', () => {
  let component: InformeTareasComponent;
  let fixture: ComponentFixture<InformeTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeTareasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
