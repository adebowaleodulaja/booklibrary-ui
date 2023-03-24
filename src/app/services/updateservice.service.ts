import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Book } from '../model/book';

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

    private newData = new BehaviorSubject<Book>(this.initialData);

    currentData = this.newData.asObservable();

    constructor() { }

    setCurrentDeviceType(data: Book) {
        this.newData.next(data);
    }
}