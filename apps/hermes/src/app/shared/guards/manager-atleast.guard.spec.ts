import { TestBed } from '@angular/core/testing';

import { ManagerAtleastGuard } from './manager-atleast.guard';

describe('ManagerAtleastGuard', () => {
  let guard: ManagerAtleastGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ManagerAtleastGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
