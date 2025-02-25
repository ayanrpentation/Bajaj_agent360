import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardNewComponent } from './scorecard-new.component';

describe('ScorecardNewComponent', () => {
  let component: ScorecardNewComponent;
  let fixture: ComponentFixture<ScorecardNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorecardNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScorecardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
