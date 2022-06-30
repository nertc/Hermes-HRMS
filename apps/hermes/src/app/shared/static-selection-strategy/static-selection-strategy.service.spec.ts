import { TestBed } from '@angular/core/testing';

import { StaticSelectionStrategyService } from './static-selection-strategy.service';

describe('StaticSelectionStrategyService', () => {
  let service: StaticSelectionStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticSelectionStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
