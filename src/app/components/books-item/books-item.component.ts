import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Book } from '../../model/book';
import { Category } from '../../model/category';
import { BooklibraryService } from '../../services/booklibrary.service';

@Component({
  selector: 'app-books-item',
  templateUrl: './books-item.component.html',
  styleUrls: ['./books-item.component.css']
})

export class BooksItemComponent implements OnInit {
  books: Book[] = [];
  @Input() book?: Book;
  @Input() category?: Category;
  @Output() onIconButtonClicked = new EventEmitter();
  @Output() updateIconClicked = new EventEmitter();
  //@Output() noButton = new EventEmitter();
  //@Input() displayStyle?: string;
  faHeart = faHeart;
  faPencil = faPencil;
  faDelete = faTimesCircle;

  constructor(private bookService: BooklibraryService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => this.books = books);
  }

  onDeleteIconClicked() {
    this.onIconButtonClicked.emit();
  }

  onUpdateIconClicked() {
    this.updateIconClicked.emit();
  }

  /* deleteBook(bookId: number) {
    if (confirm("Are you sure you want to delete book: " + bookId)) {
      console.log("Book Id sent: " + bookId);
      this.bookService.deleteBook(bookId).subscribe(() => (this.books = this.books.filter(book => book.id !== bookId)));
      // this.bookService.deleteBook(book).subscribe(() => (this.books = this.books.filter(book => book.id !== book.id)));
    }
  } */

}
