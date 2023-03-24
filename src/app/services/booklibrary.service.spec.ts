import { TestBed } from '@angular/core/testing';

import { BooklibraryService } from './booklibrary.service';

describe('BooklibraryService', () => {
  let service: BooklibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooklibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
