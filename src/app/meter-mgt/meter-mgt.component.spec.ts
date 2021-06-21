import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterMgtComponent } from './meter-mgt.component';

describe('MeterMgtComponent', () => {
  let component: MeterMgtComponent;
  let fixture: ComponentFixture<MeterMgtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterMgtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
