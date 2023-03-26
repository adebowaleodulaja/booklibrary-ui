import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { BookcategoryService } from '../../services/bookcategory.service';
import { Book } from '../../model/book';
import { Category } from '../../model/category';
import { UpdateService } from '../../services/updateservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books-item',
  templateUrl: './books-item.component.html',
  styleUrls: ['./books-item.component.css']
})

export class BooksItemComponent implements OnInit {

  @Input() book?: Book;
  @Input() bookTitle?: string;
  @Input() category?: Category;
  @Input() updateDisplayStyle?: string;
  @Input() categories: Category[] = [];
  @Input() categoryId: number = 0;
  @Output() onIconButtonClicked = new EventEmitter();
  @Output() updateIconClicked = new EventEmitter();
  @Output() onUpdateBook: EventEmitter<Book> = new EventEmitter();
  @Output() btnClick = new EventEmitter();
  books: Book[] = [];
  bookToUpdate!: Book;
  favourite!: boolean;
  subscription!: Subscription;

  faHeart = faHeart;
  faPencil = faPencil;
  faDelete = faTimesCircle;

  constructor(
    private categoryService: BookcategoryService,
    private updateService: UpdateService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => this.categories = categories);
    this.subscription = this.updateService.onToggleFavourite().subscribe(val => this.favourite = val);
  }

  onDeleteIconClicked() {
    this.onIconButtonClicked.emit();
  }

  onUpdateIconClicked() {
    this.updateIconClicked.emit();
    this.updateService.setCurrentBookData(this.book!);
    console.log(this.book);
  }

  closeUpdateConfirmDialog() {
    //this.updateDisplayStyle = "none";
    this.btnClick.emit();
  }

  onFavouriteIconClicked() {
    this.updateService.toggleFavourite();
  }

  getBookToBeUpdated(): Book {
    this.updateService.currentBookData.subscribe(bookToUpdate => {
      this.bookToUpdate = bookToUpdate;
    });
    return this.bookToUpdate;
  }


}
