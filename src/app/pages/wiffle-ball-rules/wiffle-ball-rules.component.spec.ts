import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiffleBallRulesComponent } from './wiffle-ball-rules.component';

describe('WiffleBallRulesComponent', () => {
  let component: WiffleBallRulesComponent;
  let fixture: ComponentFixture<WiffleBallRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WiffleBallRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WiffleBallRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
