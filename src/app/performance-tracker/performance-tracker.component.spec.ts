import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceTrackerComponent } from './performance-tracker.component';

describe('PerformanceTrackerComponent', () => {
  let component: PerformanceTrackerComponent;
  let fixture: ComponentFixture<PerformanceTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
