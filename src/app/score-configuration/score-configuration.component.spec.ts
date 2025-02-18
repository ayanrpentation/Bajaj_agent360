import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreConfigurationComponent } from './score-configuration.component';

describe('ScoreConfigurationComponent', () => {
  let component: ScoreConfigurationComponent;
  let fixture: ComponentFixture<ScoreConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
