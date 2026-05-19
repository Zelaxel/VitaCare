import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronofyCalendar } from './cronofy-calendar';

describe('CronofyCalendar', () => {
  let component: CronofyCalendar;
  let fixture: ComponentFixture<CronofyCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CronofyCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(CronofyCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
