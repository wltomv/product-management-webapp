import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from '../../shared/global-constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  responseMessage: any;
  data: any;
  constructor(private dashboardService: DashboardService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService) {
    this.ngxService.start();
    this.dashboardData();
  }

  ngOnInit(): void {
  }

  dashboardData() {
    this.dashboardService.getDetails().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.data = response;
        console.log(this.data);

      },
      error: (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error)
      }
    })
  }

}
