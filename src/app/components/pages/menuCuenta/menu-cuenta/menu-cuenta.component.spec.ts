import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCuentaComponent } from './menu-cuenta.component';

describe('MenuCuentaComponent', () => {
  let component: MenuCuentaComponent;
  let fixture: ComponentFixture<MenuCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
