import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/model/category';
import { BookcategoryService } from '../../services/bookcategory.service';
import { Book } from '../../model/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  title?: string;
  author?: string;
  publisher?: string;
  isbn?: string;
  yearReleased?: string;
  noOfCopies?: string;
  category?: Category;
  categories: Category[] = [];
  categoryId: number = 0;
  @Output() onAddBook: EventEmitter<Book> = new EventEmitter();
  @Input() displayStyle?: string;
  @Output() btnClick = new EventEmitter();

  constructor(private bookCategoryService: BookcategoryService) { }

  ngOnInit(): void {
    this.bookCategoryService.getCategories().subscribe((categories) => this.categories = categories);
  }

  onClosePopup() {
    this.btnClick.emit();
  }

  onSubmitForm() {
    if (!this.title) {
      alert("Please enter a book title");
      return;
    } else if (!this.isbn) {
      alert("Book ISBN is required");
      return;
    } else if (!this.yearReleased) {
      alert("Year released is required");
      return;
    } else if (!this.noOfCopies) {
      alert("No of copies is required");
      return;
    } else if (!this.publisher) {
      alert("Publisher is required");
      return;
    } else if (this.categoryId == 0) {
      alert("Please select a category");
      return;
    }
    this.category = { id: this.categoryId, name: '', description: '' };

    const newBook = {
      title: this.title,
      publisher: this.publisher!,
      author: this.author!,
      isbn: this.isbn!,
      yearReleased: this.yearReleased!,
      noOfCopies: this.noOfCopies!,
      category: this.category
    }

    this.onAddBook.emit(newBook);

    alert("A new book has been successfully added.");

    this.title = '';
    this.author = '';
    this.publisher = '';
    this.isbn = '';
    this.yearReleased = '';
    this.noOfCopies = '';
  }

}
