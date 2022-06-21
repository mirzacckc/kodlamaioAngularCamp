import { TestBed } from '@angular/core/testing';

import { CanExitGuard } from './can-exit.guard';

describe('CanExitGuard', () => {
  let guard: CanExitGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanExitGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
