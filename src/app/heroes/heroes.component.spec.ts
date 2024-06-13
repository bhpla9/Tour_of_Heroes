import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../../message.service';
import { Hero } from '../hero';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes', 'delete', 'add']);
    const messageSpy = jasmine.createSpyObj('MessageService', ['add', 'clear']);

    await TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: MessageService, useValue: messageSpy },
      ]
    }).compileComponents();
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
  });
    
  beforeEach(() => { // synchronous
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    heroService.getHeroes.and.returnValue(of([{ id: 1, name: 'Hero1' }, { id: 2, name: 'Hero2' }])); // Call the service and return mock data
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get all heroes from the hero service on initiliasation', () => {  // This test focuses on how the component interacts with the hero service -- ensures that component behaves correvtly when the service is called
    expect(heroService.getHeroes).toHaveBeenCalled()
    expect(component.heroes).toEqual([{ id: 1, name: 'Hero1' }, { id: 2, name: 'Hero2' }])
  })

  it('should call the delete hero method when the button is clicked', async () => {
    spyOn(component, 'delete')
    fixture.detectChanges()
    let deleteBtn = fixture.debugElement.nativeElement.querySelector('.delete')
    deleteBtn.click()

    await fixture.whenStable() // wait for async operations to coplete 
    expect(component.delete).toHaveBeenCalled()
  });

  it('should call the add hero method when the button is clicked', async () => {
    spyOn(component, 'add')
    fixture.detectChanges()
    let addBtn = fixture.debugElement.nativeElement.querySelector('.add-button')
    addBtn.click()

    await fixture.whenStable() // wait for async operations to coplete 
    expect(component.add).toHaveBeenCalled()
  });

})
