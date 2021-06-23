import { Component, OnInit, Input } from '@angular/core';

// Use this import to close the dialog on success
import  { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls created in former step
import { FetchApiDataService  } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input()loginInfo = { Username: '', Password: ''};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    // Do nothing
  }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginInfo).subscribe((result) => {
      // Logic for a successful user login goes here!
      this.dialogRef.close();
      console.log(result);
      localStorage.setItem('token',result.token)
      localStorage.setItem('user', this.loginInfo.Username)
      this.snackBar.open('user logged in successfully', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies'])
    }, (result) => {
      console.log(result)
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    })
  }

}
