import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuadricSurfaceComponent } from './quadric-surface.component';

describe('QuadricSurfaceComponent', () => {
  let component: QuadricSurfaceComponent;
  let fixture: ComponentFixture<QuadricSurfaceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadricSurfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadricSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
