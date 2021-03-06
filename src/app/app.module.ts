import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'

import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieDescriptionComponent } from './movie-description/movie-description.component';
import { MovieGenreComponent } from './movie-genre/movie-genre.component';
import { MovieDirectorComponent } from './movie-director/movie-director.component';  
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangeProfileFormComponent } from './change-profile-form/change-profile-form.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent},
  { path: 'movies', component: MovieCardComponent},
  { path: 'profile', component: UserProfileComponent},
  { path: '', redirectTo: 'welcome', pathMatch:'prefix'},
]

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    MovieDescriptionComponent,
    MovieGenreComponent,
    MovieDirectorComponent,
    MainNavComponent,
    UserProfileComponent,
    ChangeProfileFormComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatToolbarModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
