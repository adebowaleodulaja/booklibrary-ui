import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../model/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent implements OnInit {
  name?: string;
  description?: string;
  @Output() onAddCategory: EventEmitter<Category> = new EventEmitter();
  @Input() displayStyle?: string;
  @Output() btnClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  onClosePopup() {
    this.btnClick.emit();
  }

  onSubmitForm() {
    if (!this.name && !this.description) {
      alert("Please a name and a description for your category");
      return;
    }

    const newCategory = {
      name: this.name!,
      description: this.description!,
    }

    this.onAddCategory.emit(newCategory);

    //alert("A new category has been successfully added.");

    this.name = '';
    this.description = '';
  }

}
