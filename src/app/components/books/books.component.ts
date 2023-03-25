import { Component, OnInit } from '@angular/core';
import { BooklibraryService } from '../../services/booklibrary.service';
import { Book } from '../../model/book';
import { Category } from '../../model/category';
import { UpdateService } from '../../services/updateservice.service';

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
    this.bookService.addBook(bookRequestBody).subscribe((returnedBook) => (this.books.push(returnedBook)));
  }

  deleteBook(bookId: number) {
    if (confirm("Are you sure you want to delete book: " + bookId)) {
      this.bookService.deleteBook(bookId).subscribe(() => (this.books = this.books.filter(book => book.id !== bookId)));
      alert("Book was successfully deleted");
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
