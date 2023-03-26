import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Book } from '../model/book';
import { Category } from '../model/category';

@Injectable({
    providedIn: 'root'
})
export class UpdateService {
    initialData: Book = {
        title: '',
        publisher: '',
        author: '',
        isbn: '',
        yearReleased: '',
        noOfCopies: '',
        category: { id: 0, name: '', description: '' }
    }

    initialCategoryData: Category = {
        id: 0,
        name: '',
        description: ''
    }

    private favourite: boolean = false;
    private subject = new Subject<any>();
    private bookData = new BehaviorSubject<Book>(this.initialData);
    private categoryData = new BehaviorSubject<Category>(this.initialCategoryData);

    currentBookData = this.bookData.asObservable();
    currentCategoryData = this.categoryData.asObservable();

    constructor() { }

    setCurrentBookData(data: Book) {
        this.bookData.next(data);
    }

    setCurrentCategoryData(data: Category) {
        this.categoryData.next(data);
    }

    toggleFavourite(): void {
        this.favourite = !this.favourite;
        this.subject.next(this.favourite);
    }

    onToggleFavourite(): Observable<any> {
        return this.subject.asObservable();
    }
}