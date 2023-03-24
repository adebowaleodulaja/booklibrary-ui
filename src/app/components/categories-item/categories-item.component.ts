import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { BookcategoryService } from '../../services/bookcategory.service';
import { Category } from '../../model/category';

@Component({
  selector: 'app-categories-item',
  templateUrl: './categories-item.component.html',
  styleUrls: ['./categories-item.component.css']
})
export class CategoriesItemComponent implements OnInit {
  //@Input() category?: Category;
  categories: Category[] = [];
  @Output() onDeleteCategory: EventEmitter<Category> = new EventEmitter();
  faHeart = faHeart;
  faPencil = faPencil;
  faDelete = faTimesCircle;

  constructor(private categoryService: BookcategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => this.categories = categories);
  }

  onDelete(categoryToDelete?: Category) {
    this.onDeleteCategory.emit(categoryToDelete);
  }

  deleteCategory(categoryToDelete: Category) {
    alert("Want to delete book id " + categoryToDelete.id + " ?");
  }
}
