import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.scss']
})

/**
 * This component provides modal/dialog of movie description.
 */
export class MovieDescriptionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Description: string
    }
    ) {
   }

  ngOnInit(): void {
    // Do nothing
  }

}
