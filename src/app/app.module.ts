import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/button/button.component';
import { BooksComponent } from './components/books/books.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BooksItemComponent } from './components/books-item/books-item.component';
import { CategoriesItemComponent } from './components/categories-item/categories-item.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';

const appRoutes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'categories', component: CategoriesComponent },
  //{ path: 'about', component: AboutComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    BooksComponent,
    CategoriesComponent,
    BooksItemComponent,
    CategoriesItemComponent,
    AddBookComponent,
    AddCategoryComponent,
    UpdateBookComponent,
    UpdateCategoryComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
