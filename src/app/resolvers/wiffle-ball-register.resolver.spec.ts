import { TestBed } from '@angular/core/testing';

import { WiffleBallRegisterResolver } from './wiffle-ball-register.resolver';

describe('WiffleBallRegisterResolver', () => {
  let resolver: WiffleBallRegisterResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(WiffleBallRegisterResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
