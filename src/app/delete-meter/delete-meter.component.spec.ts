import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMeterComponent } from './delete-meter.component';

describe('DeleteMeterComponent', () => {
  let component: DeleteMeterComponent;
  let fixture: ComponentFixture<DeleteMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
