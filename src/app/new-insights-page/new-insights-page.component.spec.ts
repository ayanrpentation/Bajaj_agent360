import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInsightsPageComponent } from './new-insights-page.component';

describe('NewInsightsPageComponent', () => {
  let component: NewInsightsPageComponent;
  let fixture: ComponentFixture<NewInsightsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewInsightsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInsightsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
