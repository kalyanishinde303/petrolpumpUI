import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustReportComponent } from './cust-report.component';

describe('CustReportComponent', () => {
  let component: CustReportComponent;
  let fixture: ComponentFixture<CustReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
