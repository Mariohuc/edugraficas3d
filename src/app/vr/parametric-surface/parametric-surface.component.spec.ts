import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ParametricSurfaceComponent } from './parametric-surface.component';

describe('ParametricSurfaceComponent', () => {
  let component: ParametricSurfaceComponent;
  let fixture: ComponentFixture<ParametricSurfaceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametricSurfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametricSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
