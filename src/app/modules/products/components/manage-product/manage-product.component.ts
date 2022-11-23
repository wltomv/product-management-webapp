import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { GlobalConstants } from 'src/app/modules/shared/global-constants';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  displayedColumns: string[] = [
    'name', 'categoryName', 'description', 'price', 'edit'
  ];
  dataSource: any;
  responseMessage: any;
  constructor(private productService: ProductService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      },
      error: (error) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message ? error.error?.message : GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe({
      next: () => {
        dialogRef.close();
      }
    });
    const sub = dialogRef.componentInstance.onAddProduct.subscribe((response) => {
      this.tableData();
    })
  }

  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    console.log(values)
    dialogConfig.data = {
      action: 'Edit',
      data: values
    }
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe({
      next: () => {
        dialogRef.close();
      }
    });
    const sub = dialogRef.componentInstance.onEditProduct.subscribe((response) => {
      this.tableData();
    })
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: `delete ${values.product} product`
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(response => {
      this.ngxService.start();
      this.deleteProduct(values.id);
      dialogRef.close();
    })
  }

  deleteProduct(id: any) {
    this.productService.delete(id).subscribe({
      next: (response: any) => {

        this.tableData();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage, "success");
      },
      error: (error: any) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message ? error.error?.message : GlobalConstants.genericError
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    })
  }

  onChange(status: any, id: any) {
    let data = {
      status,
      id: id
    }
    this.productService.updateStatus(data).subscribe(
      {
        next: (response: any) => {
          this.ngxService.stop();
          this.responseMessage = response?.message;
          this.snackbarService.openSnackBar(this.responseMessage, 'success');
        },
        error: (error: any) => {
          this.ngxService.stop();
          this.responseMessage = error.error?.message ? error.error?.message : GlobalConstants.genericError
          this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
        }
      }

    )
  }
}
