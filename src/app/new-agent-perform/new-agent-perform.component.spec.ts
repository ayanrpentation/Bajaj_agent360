import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAgentPerformComponent } from './new-agent-perform.component';

describe('NewAgentPerformComponent', () => {
  let component: NewAgentPerformComponent;
  let fixture: ComponentFixture<NewAgentPerformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAgentPerformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAgentPerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
