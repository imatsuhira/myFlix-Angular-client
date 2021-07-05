import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})

/**
 * This component provides modal/dialog of director information.
 */
export class MovieDirectorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Director: {
        Name: string,
        Bio: string,
        Birth: number,
        Death: number
      }
    }
  ) { }

  ngOnInit(): void {
    //Do nothing
  }

}
