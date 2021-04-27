import { TestBed } from '@angular/core/testing';

import { WiffleBallTeamResolver } from './wiffle-ball-team.resolver';

describe('WiffleBallTeamResolver', () => {
  let resolver: WiffleBallTeamResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(WiffleBallTeamResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
