import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookcategoryService } from '../../services/bookcategory.service';
import { Category } from '../../model/category';
import { of } from 'rxjs';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  @Input() categoryDataToUpdate!: Category;
  @Input() displayStyle!: string;
  @Output() discardButton = new EventEmitter();
  @Output() updateIconClicked = new EventEmitter();
  newCategoryData: any = {};


  constructor(private categoryService: BookcategoryService) { }

  ngOnInit(): void {

  }

  onCloseDialog() {
    this.discardButton.emit();
  }

  updateCategory(data: NgForm) {
    this.newCategoryData = data;

    const categoryData = {
      id: this.newCategoryData.id,
      name: this.newCategoryData.name,
      description: this.newCategoryData.description
    }
    //console.log(categoryData);

    if (!this.newCategoryData.name) {
      alert("Category name is required");
      return;
    } else if (!this.newCategoryData.description) {
      alert("Category description is required");
      return;
    }

    of(this.categoryService.updateCategory(categoryData).subscribe({
      next: (returnedCategory) => {
        if (returnedCategory) {
          alert("Category has been successfully updated.");
        }
      },
      error: (err) => alert("An error occurred, details below\n " + err.message)
    }));
    this.onCloseDialog();
  }

}
