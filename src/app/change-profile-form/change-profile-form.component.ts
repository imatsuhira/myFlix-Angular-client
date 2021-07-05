import { Component, OnInit, Input } from '@angular/core';

import {  MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'


@Component({
  selector: 'app-change-profile-form',
  templateUrl: './change-profile-form.component.html',
  styleUrls: ['./change-profile-form.component.scss']
})

/**
 * This component provides modal/dialog to update user information.
 */
export class ChangeProfileFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''}
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ChangeProfileFormComponent>, 
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    // Do nothing
  }

  /**
   * This calls changeUserInfo on FetchApiDataService to update user info.
   * When update is done, it leads to profile page.
   */
  updateUser(): void {
    this.fetchApiData.changeUserInfo(this.userData).subscribe((result) => {
      //Logic for a successful user profile change goes here!
      this.dialogRef.close();
      console.log(result);
      localStorage.setItem('user', this.userData.Username)
      this.snackBar.open('user changed information successfully', 'OK', {
        duration: 2000
      });
      this.router.navigate(['profile'])
    }, (result)=> {
      console.log(result)
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    })
  }

}
