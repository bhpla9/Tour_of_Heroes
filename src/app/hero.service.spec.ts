import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockHEROES, mockHERO} from '../test-data/mock-heroes';

describe('HeroService', () => { // DESCRIBE keyword creates a testing suite
  let service: HeroService;
  let httpTestingController: HttpTestingController // for test data

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HeroService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })
  
  it('should return heroes', () => { 
    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toBeTruthy() // Firstly the heroes should exist 
      expect(heroes.length).toEqual(mockHEROES.length) // What we receive back from the request should be the length of the mock object 
    });
    const mockReq = httpTestingController.expectOne('api/heroes')
    expect(mockReq.request.method).toEqual('GET') // Validate that request method is GET
    mockReq.flush(mockHEROES)
  })

  it('should update hero', () => {
      service.updateHero(mockHERO).subscribe(
        response => expect(response).toEqual(mockHERO),
      );

      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('PUT');
      req.flush(mockHERO);
  });

  it('should get the hero by ID', () => { 
    const heroID = 1
    service.getHero(heroID).subscribe((hero) => {
      expect(hero).toBeTruthy();
      expect(hero.name).toBe('Batman'); // We would expect the hero to be batman
    });
    const mockReq = httpTestingController.expectOne(`api/heroes/${heroID}`);
    expect(mockReq.request.method).toEqual('GET'); // Validate that request method is GET
    mockReq.flush(mockHEROES[1]);
  })

  it('should delete the hero by ID', () => { 
    const heroID = 2
    service.deleteHero(heroID).subscribe(
      response => expect(response).toEqual(mockHEROES[1])
    )

    const req = httpTestingController.expectOne(`api/heroes/${heroID}`)
    expect(req.request.method).toEqual('DELETE')
    req.flush(mockHEROES[1])
  });


})



