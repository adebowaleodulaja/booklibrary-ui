import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../../model/book';
import { BookcategoryService } from '../../services/bookcategory.service';
import { Category } from '../../model/category';
import { BooklibraryService } from '../../services/booklibrary.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent {
  @Input() bookDataToUpdate!: Book;
  toggleStyle!: string;
  title?: string;
  author?: string;
  publisher?: string;
  isbn?: string;
  yearReleased?: string;
  noOfCopies?: string;
  category?: Category;
  categories: Category[] = [];
  categoryId!: number;
  @Input() displayStyle?: string;
  @Output() btnClick = new EventEmitter();

  newBook: any = {}

  constructor(
    private bookCategoryService: BookcategoryService,
    private bookService: BooklibraryService) {
  }

  ngOnInit(): void {
    this.bookCategoryService.getCategories().subscribe((categories) => this.categories = categories);
  }

  submitData(data: NgForm) {
    this.newBook = data;
    this.category = { id: parseInt(this.newBook.category), name: '', description: '' }
    const bookData = {
      id: this.newBook.id,
      title: this.newBook.title,
      publisher: this.newBook.publisher,
      author: this.newBook.author,
      isbn: this.newBook.isbn,
      yearReleased: this.newBook.yearReleased,
      noOfCopies: this.newBook.noOfCopies,
      category: this.category
    }
    console.log(bookData);

    if (!this.newBook.isbn) {
      alert("Book ISBN is required");
      return;
    } else if (!this.newBook.yearReleased) {
      alert("Year released is required");
      return;
    } else if (!this.newBook.noOfCopies) {
      alert("No of copies is required");
      return;
    } else if (!this.newBook.publisher) {
      alert("Publisher is required");
      return;
    } else if (this.newBook.category == 0) {
      alert("Please select a category");
      return;
    }

    of(this.bookService.updateBook(bookData).subscribe({
      next: (returnedBook) => {
        if (returnedBook) {
          alert("Book has been successfully updated.");
        }
      },
      error: (err) => alert("An error occurred, details below\n " + err.message)
    }));//(this.books.push(returnedBook)
    this.onClosePopup();
  }

  onClosePopup() {
    this.btnClick.emit();
  }

}
