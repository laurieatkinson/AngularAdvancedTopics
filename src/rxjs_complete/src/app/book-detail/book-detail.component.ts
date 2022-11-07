import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { IBook } from '../ibook';
import { DataService } from '../services/data.service';

@Component({
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit, OnDestroy {

  bookId: number | undefined;
  book: IBook | undefined;
  sub: Subscription | undefined;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _dataService: DataService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (!this.bookId) {
      this.sub = this._route.params.subscribe(
        params => {
          const id = +params['id'];
          this.getBook(id);
        });
      return;
    }
    this.getBook(this.bookId);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  getBook(id: number): void {
    this._dataService.getBook(id).subscribe(
      book => this.book = book,
      error => this.updateMessage(<any>error, 'Error'));
  }

  onRatingUpdate(book: IBook): void {
    this.updateBook(book);
  }

  updateMessage(message: string, type: string, actionText: string = 'DISMISS') {
    if (message) {
      this._snackBar.open(`${type}: ${message}`, actionText, {
        duration: 3000
      });
    }
  }

  return(): void {
    this._router.navigate(['/collection']);
  }

  updateBook(book: IBook): void {
    this._dataService.updateBook(book)
      .subscribe(books => {
          this._snackBar.open(`"${book.title}" has been updated!`, 'DISMISS', {
            duration: 3000
          });
        }, error => this.updateMessage(<any>error, 'ERROR'));
  }

  previous(): void {
    if (this.book) {
      this._dataService
        .getPreviousBookId(this.book.id)
        .subscribe((bookId) => this._router.navigate(['/collection', bookId]));
    }
  }

  next(): void {
    if (this.book) {
      this._dataService
        .getNextBookId(this.book.id)
        .subscribe((bookId) => this._router.navigate(['/collection', bookId]));
    }
  }
}
