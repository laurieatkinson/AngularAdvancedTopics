import { Component } from '@angular/core';
import { IBook } from '../ibook';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent {

  book: IBook = {
    id: 0,
    title: '',
    author: '',
    isCheckedOut: false,
    rating: 0
  };

  constructor(private _dialogRef: MatDialogRef<NewBookComponent>) { }

  cancel(): void {
    this._dialogRef.close();
  }

  save(): void {
    this._dialogRef.close(this.book);
  }

}
