import { Component, OnInit } from '@angular/core';
import { BookcategoryService } from '../../services/bookcategory.service';
import { Category } from '../../model/category';
import { of } from 'rxjs';
import { UpdateService } from 'src/app/services/updateservice.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  //category?: Category;
  categoryToUpdate!: Category;
  displayStyle = "none";
  updateConfirmDialogStyle = "none";

  constructor(private categoryService: BookcategoryService, private updateService: UpdateService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => this.categories = categories);
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

  addCategory(categoryRequestBody: Category) {
    // this.categoryService.addCategory(categoryRequestBody).subscribe((returnedCategory) =>
    //   (this.categories.push(returnedCategory)));

    of(this.categoryService.addCategory(categoryRequestBody).subscribe({
      next: (returnedCategory) => {
        if (returnedCategory) {
          this.categories.push(returnedCategory);
          alert("Category has been successfully added.");
        }
      },
      error: (err) => alert("An error occurred, details below\n " + err.message)
    }));
  }

}
