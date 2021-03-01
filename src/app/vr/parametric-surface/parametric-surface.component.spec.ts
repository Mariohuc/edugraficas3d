import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametricSurfaceComponent } from './parametric-surface.component';

describe('ParametricSurfaceComponent', () => {
  let component: ParametricSurfaceComponent;
  let fixture: ComponentFixture<ParametricSurfaceComponent>;

  beforeEach(async(() => {
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
