import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Book } from '../model/book';

@Injectable({
    providedIn: 'root'
})
export class UpdateService {
    private updateBookDialogDisplayStyle = 'none';

    initialData: Book = {
        title: '',
        publisher: '',
        author: '',
        isbn: '',
        yearReleased: '',
        noOfCopies: '',
        category: { id: 0, name: '', description: '' }
    }

    private bookData = new BehaviorSubject<Book>(this.initialData);
    currentBookData = this.bookData.asObservable();

    private displayFlag = new BehaviorSubject<string>(this.updateBookDialogDisplayStyle);
    currentFlag = this.displayFlag.asObservable();

    constructor() { }

    setCurrentBookData(data: Book) {
        this.bookData.next(data);
    }

    setCurrentFlag(newFlag: string): void {
        this.displayFlag.next(newFlag);
    }
}