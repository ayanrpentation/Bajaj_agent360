import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerTrackerComponent } from './trigger-tracker.component';

describe('TriggerTrackerComponent', () => {
  let component: TriggerTrackerComponent;
  let fixture: ComponentFixture<TriggerTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriggerTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriggerTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
