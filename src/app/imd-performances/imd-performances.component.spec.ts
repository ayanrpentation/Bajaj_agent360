import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImdPerformancesComponent } from './imd-performances.component';

describe('ImdPerformancesComponent', () => {
  let component: ImdPerformancesComponent;
  let fixture: ComponentFixture<ImdPerformancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImdPerformancesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImdPerformancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
