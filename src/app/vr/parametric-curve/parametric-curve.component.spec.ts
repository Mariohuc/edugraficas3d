import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametricCurveComponent } from './parametric-curve.component';

describe('ParametricCurveComponent', () => {
  let component: ParametricCurveComponent;
  let fixture: ComponentFixture<ParametricCurveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametricCurveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametricCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
