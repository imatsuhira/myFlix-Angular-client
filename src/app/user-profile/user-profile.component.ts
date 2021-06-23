import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog'

import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''}
  user: any = {};
  movies: any = [];
  favoriteMovies: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,

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
    });
  }
}
