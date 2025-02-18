import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GwpPerformancesComponent } from './gwp-performances.component';

describe('GwpPerformancesComponent', () => {
  let component: GwpPerformancesComponent;
  let fixture: ComponentFixture<GwpPerformancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GwpPerformancesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GwpPerformancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
