import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})

/**
 * This component provides dialog/modal to confirm deletion of user.
 */
export class DeleteConfirmationComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>
  ) { }

  ngOnInit(): void {
    // Do nothing
  }
  /**
   * Call deleteUser on FetchApiDataService to delete user information.
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser()
    this.dialogRef.close()
    localStorage.clear();
    this.router.navigate(['welcome'])
    this.snackBar.open('user successfully deleted', 'OK', {
      duration: 2000
    })
  }

  /**
   * This cancels/closes delete confirmation modal
   */
  cancelDeleteUser(): void {
    this.dialogRef.close()
  }
}
