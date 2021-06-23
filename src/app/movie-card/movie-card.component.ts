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
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};
  favoriteMovies: any = []
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
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
      console.log(this.user.FavoriteMovies)
      return this.user
    })
  }

  addFavorite(_id: string, title: string): void {
    this.fetchApiData.addFavoriteMovies(_id).subscribe(() => {
      this.snackBar.open(`${title} has been added to your favorite`, 'OK', {
        duration: 2000
      });
    })
  }

}
