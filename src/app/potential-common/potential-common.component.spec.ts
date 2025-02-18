import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialCommonComponent } from './potential-common.component';

describe('PotentialCommonComponent', () => {
  let component: PotentialCommonComponent;
  let fixture: ComponentFixture<PotentialCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotentialCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
