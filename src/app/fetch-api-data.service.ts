import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

const apiUrl = 'https://my-flix-api-practice.herokuapp.com/'
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the const rutor params
  // Ths will provide HttpClient to the entire class, making it available via this.http
  
  constructor(private http: HttpClient) {}

   // Handle error
   private handleError(error: HttpErrorResponse):
  any {
    if(error.error instanceof ErrorEvent ) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},`
        +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later'
    );
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'users', userData).pipe(
      catchError(this.handleError)
    );
  }

  //Making the api call for the user login endpoint
  userLogin(username: any, password: any): Observable<any> {
    console.log(username);
    return this.http.post(apiUrl + 'users', username).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        // map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  // To get a single movie (by title)
  getMovieInfo(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        // map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // To get a director (by name)
  getDirector(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        // map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // To get a genre by title
  getGenre(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:Title', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        // map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // To get a user by name
  getUserInfo(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/:Username', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        // map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // To get favorite movies for a user
  getFavoriteMovies(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/favoriteMovies', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        // map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Add movies to a favorite movies
  addFavoriteMovies(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/:Username/movies/:_id', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        // map(this.extractResponseData),
        catchError(this.handleError)
      );
  } 

  // Edit user
  editUser(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/:Username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        // map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  // Delete user
  deleteUser(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/:Username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        // map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  deleteFavoriteMovies(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/Username/movies/:_id', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        // map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  //Non-typed response extraction
  private extractResponseData(res: Response):
  any {
    const body = res;
    return body || { };
  }
}
