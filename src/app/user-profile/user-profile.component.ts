import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';

import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { ChangeProfileFormComponent } from '../change-profile-form/change-profile-form.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

/**
 * This component shows user information including favorite movies as well as user deletion confirmation function and change user profile function.
 */
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any = [];
  favoriteMovies: any = [];
  isLoaded = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  /**
   * When user profile is rendered, getUser function will be called to show user information
   */
  ngOnInit(): void {
    this.getUser()
  }


  /**
   * This function provides modal/dialog to show movie description as well as the one on movie-card.
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
   * This function provides modal/dialog to show  movie genre as well as the one on movie-card.
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
   * This function provides modal/dialog to show director information as well as the one on movie-card.
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
   * This function calls getUserInfo on FetchApiDataService to get user information.
   * When it received user information, it calls getMovies function.
   */
  getUser(): void {
    this.fetchApiData.getUserInfo().subscribe((res: any) => {
      this.user = res;
      this.getMovies()    
    })
  }

  /**
   * This function calls getAllMovies on FetchApiDataService to get all movies.
   * When it received user information, set movies and calls filterFavoriteMovies to filter users favorite movies.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavoriteMovies()
    });
  }

  /**
   * This function filters favorite movies from all movies.
   * Also, when it's getting data from API, it shows "Lording favorite movies..." message.
   */
  filterFavoriteMovies(): void {
    this.movies.forEach((movie: any) => {
      if(this.user.FavoriteMovies.includes(movie._id)){
        this.favoriteMovies.push(movie)
      }
      this.isLoaded = true;
    });
  }

  /**
   * This function shows ChangeProfileComponent which contains form to change user information.
   */
  openUserProfileChangeDialog(): void {
    this.dialog.open(ChangeProfileFormComponent, {
      width: '280px'
    })
  }

  /**
   * This function enables user to delete movies with deleteFavoriteMovies on FetchApiDataService.
   * @param _id 
   * @type {string}
   * @param title 
   * @type {string}
   */
  deleteFavoriteMovies(_id: string, title: string): void{
    this.fetchApiData.deleteFavoriteMovies(_id).subscribe(() => { 
      this.snackBar.open(`${title} has been removed from your favorite`, 'OK', {
        duration: 2000
      });
    })
  }

  /**
   * When user clicks "delete user", this function will be called, then shows DeletionConfirmationComponent to confirm user deletion.
   */
  deleteConfirmationDialog(): void{
    this.dialog.open(DeleteConfirmationComponent, {
      width: '280px'
    })
  }
}
