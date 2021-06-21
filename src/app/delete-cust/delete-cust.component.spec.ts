import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCustComponent } from './delete-cust.component';

describe('DeleteCustComponent', () => {
  let component: DeleteCustComponent;
  let fixture: ComponentFixture<DeleteCustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
