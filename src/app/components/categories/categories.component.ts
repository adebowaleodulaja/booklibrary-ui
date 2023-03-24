import { Component, OnInit } from '@angular/core';
import { BookcategoryService } from '../../services/bookcategory.service';
import { Category } from '../../model/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  category?: Category;
  displayStyle = "none";

  constructor(private categoryService: BookcategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => this.categories = categories);
  }

  addCategory(categoryRequestBody: Category) {
    this.categoryService.addCategory(categoryRequestBody).subscribe((returnedCategory) => (this.categories.push(returnedCategory)));
  }

  deleteCategory(categoryToDelete: Category) {
    alert("Want to delete book id " + categoryToDelete.id + " ?");
  }

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

}
