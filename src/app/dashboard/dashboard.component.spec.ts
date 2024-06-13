import { ComponentFixture, TestBed, async, waitForAsync } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { HeroService } from '../hero.service';
import { of } from 'rxjs/internal/observable/of';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => { // handling asynch operations e.g. compiling components
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes', 'delete', 'add']);
    await TestBed.configureTestingModule({ // this configures testing module
      declarations: [DashboardComponent],
      imports: [RouterModule.forRoot([])],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
      ]
    })
    .compileComponents() // async operation - ensures it's ready for testing
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
  });

  beforeEach(() => { // synchronous - deals with creating component and deteching changes 
  fixture = TestBed.createComponent(DashboardComponent);
  component = fixture.componentInstance;
  heroService.getHeroes.and.returnValue(of([{ id: 1, name: 'Hero1' }, { id: 2, name: 'Hero2' }])); // Call the service and return mock data
  fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
  
