import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryApexComponent } from './try-apex.component';

describe('TryApexComponent', () => {
  let component: TryApexComponent;
  let fixture: ComponentFixture<TryApexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TryApexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TryApexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
