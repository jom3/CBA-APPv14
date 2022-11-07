import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegLogeoComponent } from './reg-logeo.component';

describe('RegLogeoComponent', () => {
  let component: RegLogeoComponent;
  let fixture: ComponentFixture<RegLogeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegLogeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegLogeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
