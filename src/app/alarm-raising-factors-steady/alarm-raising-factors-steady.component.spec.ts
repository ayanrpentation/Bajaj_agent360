import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmRaisingFactorsSteadyComponent } from './alarm-raising-factors-steady.component';

describe('AlarmRaisingFactorsSteadyComponent', () => {
  let component: AlarmRaisingFactorsSteadyComponent;
  let fixture: ComponentFixture<AlarmRaisingFactorsSteadyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmRaisingFactorsSteadyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmRaisingFactorsSteadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
