import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/modules/shared/global-constants';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMessage: any;
  hide = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackbarService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
    this.authService.login(data).subscribe(
      {
        next: (response: any) => {
          this.ngxService.stop();
          this.dialogRef.close();
          sessionStorage.setItem('token', response.token)
        },
        error: error => {
          this.ngxService.stop();
          this.responseMessage = error.error?.message ? error.error?.message : GlobalConstants.genericError
          // if (error.error?.message) {
          //   this.responseMessage = error.error?.message;
          // } else {
          //   this.responseMessage = GlobalConstants.genericError;
          // }
          this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
        },
        complete: () => this.router.navigate(['/managements/dashboard'])
      }
    )
  }


}
