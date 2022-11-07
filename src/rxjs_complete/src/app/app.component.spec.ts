import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { TabsComponent } from './tabs/tabs.component';

// fdescribe: focused describe
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AboutComponent,
        TabsComponent,
      ],
      imports: [
        MatTabsModule,
        MatToolbarModule,
        MatSnackBarModule,
        RouterTestingModule,
        ServiceWorkerModule.register('', { enabled: false })
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'My Tiny Library App!!!'`, () => {
    expect(component.title).toEqual('My Tiny Library App!!!');
  });

  it('should render about tab with title ABOUT ME', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelectorAll('.mat-tab-link')[0].textContent).toContain('ABOUT ME');
  });

  it('should render book collection tab with title MY COLLECTION', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelectorAll('.mat-tab-link')[1].textContent).toContain('MY COLLECTION');
  });

});
