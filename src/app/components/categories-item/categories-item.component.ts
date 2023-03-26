import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { BookcategoryService } from '../../services/bookcategory.service';
import { Category } from '../../model/category';
import { UpdateService } from '../../services/updateservice.service';

@Component({
  selector: 'app-categories-item',
  templateUrl: './categories-item.component.html',
  styleUrls: ['./categories-item.component.css']
})
export class CategoriesItemComponent implements OnInit {
  @Output() updateIconClicked = new EventEmitter();
  categories: Category[] = [];
  categoryToUpdate!: Category;
  displayStyle!: string;
  faHeart = faHeart;
  faPencil = faPencil;
  faDelete = faTimesCircle;

  constructor(private categoryService: BookcategoryService, private updateService: UpdateService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => this.categories = categories);
  }

  closeDialog() {
    this.displayStyle = 'none';
  }

  onUpdateIconClicked(categoryToUpdate: Category) {
    this.updateIconClicked.emit();
    this.displayStyle = 'block';
    console.log(categoryToUpdate);
    this.updateService.setCurrentCategoryData(categoryToUpdate);
  }

  getCategoryToUpdate(): Category {
    this.updateService.currentCategoryData.subscribe(categoryToUpdate => {
      this.categoryToUpdate = categoryToUpdate;
    });
    return this.categoryToUpdate;
  }

  deleteCategory(categoryId: number) {
    if (confirm("Are you sure you want to delete this category " + categoryId + " ?")) {
      this.categoryService.deleteCategory(categoryId).subscribe(() =>
        (this.categories = this.categories.filter(category => category.id !== categoryId)));
      alert("Category was successfully deleted");
    }
  }

}
