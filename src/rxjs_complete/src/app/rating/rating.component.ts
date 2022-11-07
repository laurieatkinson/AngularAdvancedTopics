import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IBook } from '../ibook';

@Component({
  selector: 'my-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnChanges {

  @Input() rating = 0;
  @Input() book: IBook | undefined;
  @Output() ratingClicked: EventEmitter<IBook> = new EventEmitter<IBook>();

  ngOnChanges() {
    console.log('ngOnChanges');
  }

  click(rating: number): void {
    if (this.book) {
      this.book.rating = rating;
      this.ratingClicked.emit(this.book);
    }
  }
}
