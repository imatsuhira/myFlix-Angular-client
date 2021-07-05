import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog'
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

/**
 * This component shows movie information as movie-cards.
 */
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};
  favoriteMovies: any = []
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  /**
   * When component is rendered, getMovies and getUser function are initialized.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  /**
   * This function calls getAllMovies function on FetchApiDataService and return all movies data on backend.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * When user clicks Description button, 
   * this function will be called and open MovieDescriptionComponent to show movie's description.
   * @param Description 
   * @type {string}
   */
  openMovieDescriptionDialog(Description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: {
        Description
      }
    });
  }

  /**
   * When user clicks Genre button, 
   * this function will be called and open MovieGenreComponent to show movie's Genre.
   * @param Genre 
   */
  openMovieGenreDialog(Genre: []): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Genre
      }  
    })
  }

  /**
   * When user clicks Director button, 
   * this function will be called and open MovieDirectorComponent to show movie's director information.
   * @param Director 
   */
  openDirectorDialog(Director: []): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {
        Director
      }
    })
  }

  /**
   * This function calls getUserInfo on FetchApiDataService and GET user information.
   */
  getUser(): void {
    this.fetchApiData.getUserInfo().subscribe((res: any) => {
      this.user = res;
      console.log(this.user.FavoriteMovies)
      return this.user
    })
  }


  /**
   * This function calls getUserInfo on FetchApiDataService and GET user information.
   * @param _id 
   * @type {string}
   * @param title 
   * @type {string}
   */
  addFavorite(_id: string, title: string): void {
    this.fetchApiData.addFavoriteMovies(_id).subscribe(() => {
      this.snackBar.open(`${title} has been added to your favorite`, 'OK', {
        duration: 2000
      });
    })
  }

}
