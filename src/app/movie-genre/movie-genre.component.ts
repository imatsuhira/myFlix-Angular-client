import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss']
})

/**
 * This component provides modal/dialog of movie genre information.
 */
export class MovieGenreComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Genre: {
        Name: string,
        Description: string
      }
    }
  ) { }

  ngOnInit(): void {
    // Do nothing
  }

}
