import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroService } from './hero.service';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async() => { // import dependencies in component
    await TestBed.configureTestingModule({
      declarations: [AppComponent, HeroesComponent, MessagesComponent],
      imports: [RouterModule.forRoot([ 
        {path: 'heroes', component: HeroesComponent}
      ])],
      providers: [HeroService]
    }).compileComponents()
  })
  
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance; // creates an insstance of the class 
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Tour Of Heroes 🦸‍♀️`, () => {
    expect(component.title).toEqual('Tour Of Heroes 🦸‍♀️');
  });

  // it(`should render the '/heroes' page when clicked`, async () => {
  //   fixture.detectChanges()
  //   const heroesBtn = fixture.debugElement.query(By.css('a[routerLink="/heroes"]')).nativeElement;
  //   heroesBtn.click()

  //   await fixture.whenStable();
  //   expect(location.path()).toBe('/heroes');
  //   });

  });
