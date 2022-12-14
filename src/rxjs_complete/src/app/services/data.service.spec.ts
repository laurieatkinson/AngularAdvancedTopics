import { TestBed, inject } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
  });

  it('should call getBooks',
    inject([DataService, HttpTestingController], (service: DataService, httpTestingController: HttpTestingController) => {
      service.getBooks().subscribe();
      const req = httpTestingController.expectOne('https://bookservicelaurie.azurewebsites.net/api/books');
      expect(req.request.method).toEqual('GET');
      req.flush([]);
    }));

  it('should call getBooks and receive two books',
    inject([DataService, HttpTestingController], (service: DataService, httpTestingController: HttpTestingController) => {
      service.getBooks().subscribe((books) => {
        expect(books.length).toBe(2);
      });

      const req = httpTestingController.expectOne('https://bookservicelaurie.azurewebsites.net/api/books');

      // after the flush is executed the subscription above will receive a value
      req.flush([
        { id: 1, title: 'Angular Rocks!', author: 'Wael Kdouh', isCheckedOut: true, rating: 5 },
        { id: 2, title: 'Node Rocks!', author: 'Wael Kdouh', isCheckedOut: false, rating: 5 }
      ]);

    }));

});
