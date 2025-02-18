import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallPerformance2Component } from './overall-performance2.component';

describe('OverallPerformance2Component', () => {
  let component: OverallPerformance2Component;
  let fixture: ComponentFixture<OverallPerformance2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallPerformance2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallPerformance2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
