import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustUpdateComponent } from './cust-update.component';

describe('CustUpdateComponent', () => {
  let component: CustUpdateComponent;
  let fixture: ComponentFixture<CustUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
