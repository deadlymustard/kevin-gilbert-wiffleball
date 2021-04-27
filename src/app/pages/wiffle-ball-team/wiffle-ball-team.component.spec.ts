import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiffleBallTeamComponent } from './wiffle-ball-team.component';

describe('WiffleBallTeamComponent', () => {
  let component: WiffleBallTeamComponent;
  let fixture: ComponentFixture<WiffleBallTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WiffleBallTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WiffleBallTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
