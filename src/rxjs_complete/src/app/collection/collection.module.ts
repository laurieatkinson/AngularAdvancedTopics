import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection.component';
import { RatingCategoryPipe } from '../pipes/rating-category.pipe';
import { RatingComponent } from '../rating/rating.component';
import { NewBookComponent } from '../new-book/new-book.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { BookGuardService } from '../guards/book-guard.service';

@NgModule({
  imports: [
    CommonModule,
    CollectionRoutingModule,
    FormsModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    MatListModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatLineModule,
    MatInputModule,
    MatToolbarModule
  ],
  declarations: [
    CollectionComponent,
    RatingComponent,
    BookDetailComponent,
    NewBookComponent,
    RatingCategoryPipe
  ],
  providers: [
      BookGuardService
  ]
})
export class CollectionModule { }
