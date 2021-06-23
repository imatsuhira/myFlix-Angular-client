import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  constructor(
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  logoutUser(){
    localStorage.clear()
    this.snackBar.open('user logout successfully', 'OK', {
      duration: 2000
    })
    this.router.navigate(['welcome'])
  }
}
