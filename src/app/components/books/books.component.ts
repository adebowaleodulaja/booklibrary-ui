import { Component, OnInit } from '@angular/core';
import { BooklibraryService } from '../../services/booklibrary.service';
import { Book } from '../../model/book';
import { Category } from '../../model/category';
import { UpdateService } from '../../services/updateservice.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
  books: Book[] = [];
  category?: Category;
  displayStyle = "none";
  updateConfirmDialogStyle = "none";

  constructor(private bookService: BooklibraryService, private updateService: UpdateService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => this.books = books);
  }

  addBook(bookRequestBody: Book) {
    //this.bookService.addBook(bookRequestBody).subscribe((returnedBook) => (this.books.push(returnedBook)));
    of(this.bookService.addBook(bookRequestBody).subscribe({
      next: (returnedBook) => {
        if (returnedBook) {
          this.books.push(returnedBook);
          alert("Book has been successfully added.");
        }
      },
      error: (err) => alert("An error occurred, details below\n " + err.message)
    }));
  }

  deleteBook(bookId: number) {
    if (confirm("Are you sure you want to delete book: " + bookId)) {
      //this.bookService.deleteBook(bookId).subscribe(() => (this.books = this.books.filter(book => book.id !== bookId)));
      of(this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          this.books = this.books.filter(book => book.id !== bookId);
          alert("Book has been successfully added.");
        },
        error: (err) => alert("An error occurred, details below\n " + err.message)
      }));
    }
  }

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  openUpdateConfirmDialog() {
    this.updateConfirmDialogStyle = "block";
  }

  closeUpdateConfirmDialog() {
    this.updateConfirmDialogStyle = "none";
  }


}
