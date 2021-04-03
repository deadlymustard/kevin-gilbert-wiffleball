import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoNightComponent } from './bingo-night.component';

describe('BingoNightComponent', () => {
  let component: BingoNightComponent;
  let fixture: ComponentFixture<BingoNightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingoNightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoNightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
