import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiffleBallDetailsComponent } from './wiffle-ball-details.component';

describe('WiffleBallDetailsComponent', () => {
  let component: WiffleBallDetailsComponent;
  let fixture: ComponentFixture<WiffleBallDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WiffleBallDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WiffleBallDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
