import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../model/book';
import { BookcategoryService } from '../../services/bookcategory.service';
import { Category } from '../../model/category';
import { UpdateService } from '../../services/updateservice.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent {
  @Input() bookDataToUpdate?: Book;
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
  //bookData: any = {};
  @Output() onUpdateBook: EventEmitter<Book> = new EventEmitter();
  @Input() displayStyle?: string;
  @Output() btnClick = new EventEmitter();

  constructor(private bookCategoryService: BookcategoryService, private updateService: UpdateService) {
    // updateService.onToggle().subscribe((flag: string) => { this.toggleStyle = flag });
  }

  ngOnInit(): void {
    this.bookCategoryService.getCategories().subscribe((categories) => this.categories = categories);
  }

  onClosePopup() {
    this.btnClick.emit();
  }

  onSubmitForm() {
    const newBook = {
      title: this.title!,
      publisher: this.publisher!,
      author: this.author!,
      isbn: this.isbn!,
      yearReleased: this.yearReleased!,
      noOfCopies: this.noOfCopies!,
      category: this.category!
    }
    this.onUpdateBook.emit(newBook);
    /* if (!this.title) {
      alert("Please enter a book title");
      return;
    }
    else if (this.categoryId == 0) {
      alert("Please select a category");
      return
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

    this.onUpdateBook.emit(newBook);

    alert("A new book has been successfully added.");

    this.title = '';
    this.author = '';
    this.publisher = '';
    this.isbn = '';
    this.yearReleased = '';
    this.noOfCopies = ''; */
  }

}
