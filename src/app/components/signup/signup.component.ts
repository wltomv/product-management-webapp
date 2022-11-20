import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/modules/shared/global-constants';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: any = FormGroup;
  responseMessage: any;
  hide = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.email]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password: [null, [Validators.required]],
    })
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password
    }
    this.authService.signup(data).subscribe(
      {
        next: (response: any) => {
          this.ngxService.stop();
          this.dialogRef.close();
          this.responseMessage = response?.message;
          this.snackBarService.openSnackBar(this.responseMessage, "");
        },
        error: error => {
          this.ngxService.stop();
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
          } else {
            this.responseMessage = GlobalConstants.genericError;
          }
          this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
        },
        complete: () => this.router.navigate(['/'])
      }
    )
  }

}
