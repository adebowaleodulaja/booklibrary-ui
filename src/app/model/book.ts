import { Category } from "./category";

export interface Book {
    id?: number;
    title: string;
    publisher: string;
    author: string;
    isbn: string;
    yearReleased: string;
    noOfCopies: string;
    created?: string;
    updated?: string;
    category: Category;
}