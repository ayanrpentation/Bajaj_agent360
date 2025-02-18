import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VintageLessThanOneComponent } from './vintage-less-than-one.component';

describe('VintageLessThanOneComponent', () => {
  let component: VintageLessThanOneComponent;
  let fixture: ComponentFixture<VintageLessThanOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VintageLessThanOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VintageLessThanOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
