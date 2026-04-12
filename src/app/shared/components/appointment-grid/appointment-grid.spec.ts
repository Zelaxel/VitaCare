import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentGrid } from './appointment-grid';

describe('AppointmentGrid', () => {
  let component: AppointmentGrid;
  let fixture: ComponentFixture<AppointmentGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
