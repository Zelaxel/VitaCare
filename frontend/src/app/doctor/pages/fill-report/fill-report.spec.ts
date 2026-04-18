import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillReport } from './fill-report';

describe('FillReport', () => {
  let component: FillReport;
  let fixture: ComponentFixture<FillReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillReport],
    }).compileComponents();

    fixture = TestBed.createComponent(FillReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
