import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterReportComponent } from './meter-report.component';

describe('MeterReportComponent', () => {
  let component: MeterReportComponent;
  let fixture: ComponentFixture<MeterReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
