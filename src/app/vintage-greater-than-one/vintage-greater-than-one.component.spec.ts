import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VintageGreaterThanOneComponent } from './vintage-greater-than-one.component';

describe('VintageGreaterThanOneComponent', () => {
  let component: VintageGreaterThanOneComponent;
  let fixture: ComponentFixture<VintageGreaterThanOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VintageGreaterThanOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VintageGreaterThanOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
