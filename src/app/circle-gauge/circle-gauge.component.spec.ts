import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleGaugeComponent } from './circle-gauge.component';

describe('CircleGaugeComponent', () => {
  let component: CircleGaugeComponent;
  let fixture: ComponentFixture<CircleGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleGaugeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
