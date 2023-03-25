import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class BookcategoryService {
  private apiUrl = 'http://localhost:8000/v1/categories';

  constructor(private http: HttpClient) { }

  addCategory(book: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, book, httpOptions);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  updateCategory(category: Category): Observable<Category> {
    const url = `${this.apiUrl}/${category.id}`;
    return this.http.put<Category>(url, category, httpOptions);
  }

  deleteCategory(categoryId: number): Observable<Category> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.delete<Category>(url);
  }
}
