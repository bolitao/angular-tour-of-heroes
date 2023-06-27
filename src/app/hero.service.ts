import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private messageService: MessageService,
              private httpClient: HttpClient) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url)
      .pipe(
        tap(_ => {
          this.log(`getHero ${id}`)
        }),
        catchError(this.handleError<Hero>(`getHero ${id}`))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>(`updateHero ${hero.id}`)));
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => {
        this.log(`added hero, id=${hero.id}`)
      }),
      catchError(this.handleError<Hero>(`add hero ${hero.name}`))
    );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => {
        this.log(`deleted hero id=${id}`)
      }),
      catchError(this.handleError<Hero>(`deleteHero ${id}`))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.httpClient.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => {
        x.length ? this.log(`found heroes matching "${term}"`) : this.log(`no heroes matching "${term}"`)
      }),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
