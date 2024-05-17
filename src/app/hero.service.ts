import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({ // This decorator tell us that the class participates in the dependency injection system 
  providedIn: 'root' // Can be injected into any class that asks for it. Share instance of service with other components
})
export class HeroService {

  private heroesUrl = 'api/heroes';
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  
getHeroes(): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl) // Getting heroes from server -- expects it to be an array of Heroes
    .pipe( // .pipe ot make a chain of operators 
      tap(_ => this.log('fetched heroes')), // tap can perform on the emitted values but not modify them
      catchError(this.handleError<Hero[]>('getHeroes', [])) // This intercepts an observable that has failed and returns an empty array as a fallback
    ) 
}

private handleError<T>(operation = 'operation', result?: T) { // method only accessible in this class
  return (error: any): Observable<T> => {
    console.error(error); // log error to the console
    this.log(`${operation} failed: ${error.message}`); // Message showing which operation failed and includeds err message
    return of(result as T); // keep app running by returning a fallback value wrapped in an Observable so the app can continue running
  };
}

  getHero(id: number): Observable<Hero> { // Returns Hero as observable - GET
  const url = `${this.heroesUrl}/${id}`; // constructs URL for request
  return this.http.get<Hero>(url).pipe( // makes request to URL
    tap(_ => this.log(`fetched hero id is ${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}

  updateHero(hero: Hero): Observable<any> { // Update data on server - PUT
  return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe( // The API knows which hero to update by looking at the hero's id
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

httpOptions = { // Stores configurations for http requests
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // indicates that the request body contains JSON data - this ensures that the server correctly interprets
  // the data sent
};

addHero(hero: Hero): Observable<Hero> { // Add hero - POST
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

deleteHero(id: number): Observable<Hero> { // remove hero from server - DELETE 
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

  constructor(private messageService: MessageService, private http: HttpClient) { }
}




// NOTES // 

  //   const hero = HEROES.find(h => h.id === id)!; // Exclamation point means a null won't be returned
