import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArFunctionComponent } from './ar-function.component';

describe('ArFunctionComponent', () => {
  let component: ArFunctionComponent;
  let fixture: ComponentFixture<ArFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
