import { Injectable } from '@angular/core';;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/book';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class BooklibraryService {

  private apiUrl = 'http://localhost:8000/v1/books';

  constructor(private http: HttpClient) { }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, httpOptions);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  updateBook(book: Book): Observable<Book> {
    const url = `${this.apiUrl}/${book.id}`;
    return this.http.put<Book>(url, book, httpOptions);
  }

  deleteBook(bookId: number): Observable<Book> {
    const url = `${this.apiUrl}/${bookId}`;
    return this.http.delete<Book>(url);
  }

  /*  deleteBook(book: Book): Observable<Book> {
    const url = `${this.apiUrl}/${book.id}`;
    return this.http.delete<Book>(url);
  } */

}
