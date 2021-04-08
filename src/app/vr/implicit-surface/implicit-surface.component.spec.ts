import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImplicitSurfaceComponent } from './implicit-surface.component';

describe('ImplicitSurfaceComponent', () => {
  let component: ImplicitSurfaceComponent;
  let fixture: ComponentFixture<ImplicitSurfaceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImplicitSurfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplicitSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
