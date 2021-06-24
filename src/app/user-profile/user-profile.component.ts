import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';

import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { ChangeProfileFormComponent } from '../change-profile-form/change-profile-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
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

  ngOnInit(): void {
    this.getUser()
  }


  openMovieDescriptionDialog(Description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: {
        Description
      }
    });
  }

  openMovieGenreDialog(Genre: []): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Genre
      }  
    })
  }

  openDirectorDialog(Director: []): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {
        Director
      }
    })
  }
 
  getUser(): void {
    this.fetchApiData.getUserInfo().subscribe((res: any) => {
      this.user = res;
      this.getMovies()    
    })
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavoriteMovies()
    });
  }

  filterFavoriteMovies(): void {
    this.movies.forEach((movie: any) => {
      if(this.user.FavoriteMovies.includes(movie._id)){
        this.favoriteMovies.push(movie)
      }
      this.isLoaded = true;
    });
  }

  openUserProfileChangeDialog(): void {
    this.dialog.open(ChangeProfileFormComponent, {
      width: '280px'
    })
  }

  deleteFavoriteMovies(_id: string, title: string): void{
    this.fetchApiData.deleteFavoriteMovies(_id).subscribe(() => { 
      this.snackBar.open(`${title} has been removed from your favorite`, 'OK', {
        duration: 2000
      });
    })
  }
}
