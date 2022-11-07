import { Router } from '@angular/router';
import { IBook } from 'app/ibook';
import { DataService } from 'app/services/data.service';
import { from, of } from 'rxjs';
import { BookDetailComponent } from './book-detail.component';

// Example of not using TestBed

const mockSnackbar = jasmine.createSpyObj(['open']);

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let expectedBook: IBook;

  beforeEach(() => {
    expectedBook = {
      id: 1234,
      title: 'Title 1',
      author: 'Author 1',
      isCheckedOut: false,
      rating: 5
    };
  
    const activatedRoute = { params: from([{id: 1234}]) };
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getBook']);
    dataServiceSpy.getBook.and.returnValue(of(expectedBook));
    component = new BookDetailComponent(activatedRoute as any, routerSpy, dataServiceSpy, mockSnackbar);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets data', () => {
    expect(dataServiceSpy.getBook).toHaveBeenCalled();
  });

  it('populates title', () => {
    expect(component.book?.title).toEqual('Title 1');
  });
});
