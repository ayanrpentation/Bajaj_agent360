import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLobComponent } from './single-lob.component';

describe('SingleLobComponent', () => {
  let component: SingleLobComponent;
  let fixture: ComponentFixture<SingleLobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleLobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleLobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
