import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialDifferentComponent } from './potential-different.component';

describe('PotentialDifferentComponent', () => {
  let component: PotentialDifferentComponent;
  let fixture: ComponentFixture<PotentialDifferentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialDifferentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotentialDifferentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
