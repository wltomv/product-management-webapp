import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/modules/shared/global-constants';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

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
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = {
    //   action: 'Add'
    // }
    // dialogConfig.width = '850px';
    // const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    // this.router.events.subscribe({
    //   next: () => {
    //     dialogRef.close();
    //   }
    // });
    // const sub = dialogRef.componentInstance.onAddCategory.subscribe((response) => {
    //   this.tableData();
    // })
  }

  handleEditAction(value: any) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = {
    //   action: 'Edit',
    //   data: value
    // }
    // dialogConfig.width = '850px';
    // const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    // this.router.events.subscribe({
    //   next: () => {
    //     dialogRef.close();
    //   }
    // });
    // const sub = dialogRef.componentInstance.onEditCategory.subscribe((response) => {
    //   this.tableData();
    // })
  }

  handleDeleteAction(value: any) {

  }
  onChange(status: any, id: any) { }
}
