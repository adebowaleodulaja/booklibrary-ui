import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { BookcategoryService } from '../../services/bookcategory.service';
import { BooklibraryService } from '../../services/booklibrary.service';
import { Book } from '../../model/book';
import { Category } from '../../model/category';
import { UpdateService } from '../../services/updateservice.service';

@Component({
  selector: 'app-books-item',
  templateUrl: './books-item.component.html',
  styleUrls: ['./books-item.component.css']
})

export class BooksItemComponent implements OnInit {

  @Input() book?: Book;
  @Input() bookTitle?: string;
  @Input() category?: Category;
  @Output() onIconButtonClicked = new EventEmitter();
  @Output() updateIconClicked = new EventEmitter();
  @Output() onUpdateBook: EventEmitter<Book> = new EventEmitter();
  @Output() btnClick = new EventEmitter();
  @Input() updateDisplayStyle?: string;
  @Input() categories: Category[] = [];
  @Input() categoryId: number = 0;
  books: Book[] = [];
  bookToUpdate!: Book;

  faHeart = faHeart;
  faPencil = faPencil;
  faDelete = faTimesCircle;

  constructor(
    private categoryService: BookcategoryService,
    private bookService: BooklibraryService,
    private bookUpdateService: UpdateService) {

  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => this.categories = categories);
  }

  onDeleteIconClicked() {
    this.onIconButtonClicked.emit();
  }

  onUpdateIconClicked() {
    this.updateIconClicked.emit();
    this.bookUpdateService.setCurrentBookData(this.book!);
    console.log(this.book);
  }

  closeUpdateConfirmDialog() {
    //this.updateDisplayStyle = "none";
    this.btnClick.emit();
  }

  getBookToBeUpdated(): Book {
    this.bookUpdateService.currentBookData.subscribe(bookToUpdate => {
      this.bookToUpdate = bookToUpdate;
    });
    return this.bookToUpdate;
  }

  updateBook(bookRequestBody: Book) {
    console.log(bookRequestBody);
    // this.bookService.updateBook(bookRequestBody).subscribe((returnedBook) => (this.books.push(returnedBook)));
  }


}
