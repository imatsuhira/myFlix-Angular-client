import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

/**
 * This component provides navigation bar with user logout function.
 */
export class MainNavComponent {

  constructor(
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  /**
   * When user pushes logout button, this function will be called, 
   * then clear localStorage and direct to login page.
   */
  logoutUser(){
    localStorage.clear()
    this.snackBar.open('user logout successfully', 'OK', {
      duration: 2000
    })
    this.router.navigate(['welcome'])
  }
}
