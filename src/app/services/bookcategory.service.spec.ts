import { TestBed } from '@angular/core/testing';

import { BookcategoryService } from './bookcategory.service';

describe('BookcategoryService', () => {
  let service: BookcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
