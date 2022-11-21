import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.authService.checkToken().subscribe(
        {
          next: () => {
            this.router.navigate(['/managements/dashboard'])
          },
          error: () => {
            sessionStorage.clear()
          }
        }
      )
    }
  }
  signupAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(SignupComponent, dialogConfig);
  }

  loginAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(LoginComponent, dialogConfig);
  }
}
