import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiffleBallRegisterComponent } from './wiffle-ball-register.component';

describe('WiffleBallRegisterComponent', () => {
  let component: WiffleBallRegisterComponent;
  let fixture: ComponentFixture<WiffleBallRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WiffleBallRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WiffleBallRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
