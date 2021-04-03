import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiffleBallComponent } from './wiffle-ball.component';

describe('WiffleBallComponent', () => {
  let component: WiffleBallComponent;
  let fixture: ComponentFixture<WiffleBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WiffleBallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WiffleBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
