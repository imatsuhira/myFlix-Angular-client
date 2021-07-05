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

   /**
    * This function is for handling error
    * @param error 
    * @returns Error message
    */
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

  /**
   * Making the api call for the user registration endpoint
   * @param userData : Username, Password, Birthday, Email
   * @returns Use POST method to sent user information to backend
   */
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'users', userData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Making the api call for the user login endpoint
   * @param loginInfo : Username, Password
   * @returns Bearer token from backend
   */
  userLogin(loginInfo: any): Observable<any> {
    console.log(loginInfo);
    return this.http.post(apiUrl + 'login', loginInfo).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET all movies from database using token on localStorage
   * @returns Array of movie objects from backend
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  /**
   * GET single movie by it's name using bearer token from localStorage
   * @returns Single movie object from backend
   */
  getMovieInfo(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * GET Director details by their name using bearer token from localStorage
   * (not used on app as user can read Genre information on movie details(getMovies()))
   * @returns Single director object from backend
   */
  getDirector(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/:Name', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * GET genre information by its title using bearer token from localStorage
   * (not used on app as user can read Genre information on movie details(getMovies()))
   * @returns Single genre object from backend
   */
  getGenre(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:Title', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * GET a single user information with bearer token and username from localStorage(username for endpoint)
   * @returns Single user information from backend
   */
  getUserInfo(): Observable<any>{
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user')
    console.log(username)
    return this.http.get(apiUrl + 'users/' + username, { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * GET user favorite movies with bearer token
   * @returns Favorite movies object form backend
   */
  getFavoriteMovies(): Observable<any>{
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + 'users/' + username + '/Movies' , { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * POST movie to user's favorite with bearer token
   * @param _id 
   * @type {string}
   * @returns POST movie to backend
   */
  addFavoriteMovies(_id: string): Observable<any>{
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + 'users/' + username + '/Movies/' + _id, _id, { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  } 

  /**
   * Use DELETE method to delete user information
   * @returns DELETE data on backend
   */
  deleteUser(): Observable<any>{
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user')
    return this.http.delete(apiUrl + 'users/' + username, { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  /**
   * DELETE user's favorite movies
   * @param _id 
   * @type {string}
   * @returns DELETE favorite movie on backend 
   */
  deleteFavoriteMovies(_id: string): Observable<any>{
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user')
    return this.http.delete(apiUrl + 'users/' + username + '/Movies/' + _id, { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  /**
   * PUT new user data to backend
   * @param newUserData 
   * @returns Update backend user data 
   */
  changeUserInfo(newUserData: any): Observable<any>{
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + 'users/' + username, newUserData, { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * //Non-typed response extraction
   * @param res 
   * @returns 
   */
  private extractResponseData(res: Response | {}):
  Response | {} {
    const body = res;
    return body || { };
  }
}
