
import { throwError, Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, catchError, debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IBook } from '../ibook';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class DataService {

  _booksUrl = 'https://bookservicelaurie.azurewebsites.net/api/books';
  private refreshBooksSubject = new Subject<void>();
  // private refreshBooksSubject = new BehaviorSubject<void>(undefined);

  constructor(private _http: HttpClient) { }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message : error.status ?
      `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return throwError(errMsg);
  }

  refreshBooks() {
    this.refreshBooksSubject.next();
  }

  search(terms: Observable<string>) {
    return terms
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(term => this.books$)
      );
  }

  books$ = this.refreshBooksSubject.pipe(
    startWith(null), // Not needed if using BehaviorSubject
    switchMap(() => this._http.get<IBook[]>(this._booksUrl)
    .pipe(
      catchError(this.handleError)
    )
  ));

  getBook(id: number): Observable<IBook> {
    return this._http.get<IBook>(`${this._booksUrl}/${id.toString()}`)
      .pipe(
        catchError(this.handleError)
      );
    // return this.getBooks()
    //   .pipe(
    //     map((books: IBook[]) => books.find(b => b.id === id)),
    //     catchError(this.handleError)
    //   );
  }

  getPreviousBookId(id: number): Observable<number> {
    return this.books$
      .pipe(
        map((books: IBook[]) => {
          return books[Math.max(0, books.findIndex(b => b.id === id) - 1)].id;
        }),
        catchError(this.handleError)
      );
  }

  getNextBookId(id: number): Observable<number> {
    return this.books$
      .pipe(
        map((books: IBook[]) => {
          return books[Math.min(books.length - 1, books.findIndex(b => b.id === id) + 1)].id;
        }),
        catchError(this.handleError)
      );
  }

  updateBook(book: IBook): Observable<IBook> {
    return this._http.put<IBook>(this._booksUrl, book)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteBook(id: number): Observable<{}> {
    return this._http.delete(`${this._booksUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addBook(book: IBook): Observable<IBook> {
    return this._http.post<IBook>(this._booksUrl, book)
      .pipe(
        catchError(this.handleError)
      );
  }

  canActivate(id: number): Observable<boolean> {
    return this._http.get<boolean>(`${this._booksUrl + '/canactivate'}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
