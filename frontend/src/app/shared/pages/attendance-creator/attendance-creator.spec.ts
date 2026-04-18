import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCreator } from './attendance-creator';

describe('AttendanceCreator', () => {
  let component: AttendanceCreator;
  let fixture: ComponentFixture<AttendanceCreator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceCreator],
    }).compileComponents();

    fixture = TestBed.createComponent(AttendanceCreator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
