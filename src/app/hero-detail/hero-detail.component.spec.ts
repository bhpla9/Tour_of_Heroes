import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { Hero } from '../hero';


describe('HeroDetailComponent', () => { // This is a test suite
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>; // need to create dupes of the Hero and Location service
  let mockLocation: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHero', 'updateHero']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
      { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (key: string) => '1' } } } },
      { provide: HeroService, useValue: heroServiceSpy },
      { provide: Location, useValue: locationSpy },
    ]
    }).compileComponents();
    mockHeroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    mockLocation = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    mockHeroService.getHero.and.returnValue(of({ id: 1, name: 'Test Hero' }));
    fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy();
  });

  it('should call getHero and set hero correctly', () => {
    expect(mockHeroService.getHero).toHaveBeenCalledWith(1);
    expect(component.hero).toEqual({ id: 1, name: 'Test Hero' });
  });

  it('should show the hero name in uppercase', () => {
    const heroNameTest = fixture.debugElement.nativeElement.querySelector('h2'); // get the element from the DOM and check it contains uppercase text
    expect(heroNameTest.textContent).toContain('TEST HERO');
  });
  
});
