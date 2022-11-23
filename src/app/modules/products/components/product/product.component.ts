import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/modules/shared/global-constants';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";
  responseMessage: any;
  categorys: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductComponent>,
    private categoryService: CategoryService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      product: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      category_id: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required]
    });

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = "Update";
      console.log(this.dialogData.data)
      this.productForm.patchValue(this.dialogData.data);
    }
    this.getCategorys()
  }

  getCategorys() {
    this.categoryService.getCategorys().subscribe({
      next: (response: any) => {
        this.categorys = response;
      },
      error: (error: any) => {
        this.responseMessage = error.error?.message ? error.error?.message : GlobalConstants.genericError
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }

  handleSubmit() {
    if (this.dialogAction === "Edit") {
      this.edit();
    } else {
      this.add();
    }
  }



  add() {
    let formData = this.productForm.value;
    var data = {
      name: formData.product,
      categoryId: formData.category_id,
      price: formData.price,
      description: formData.description,
    }
    this.productService.add(data).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.onAddProduct.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, "success");
      },
      error: (error: any) => {
        this.dialogRef.close();
        this.responseMessage = error.error?.message ? error.error?.message : GlobalConstants.genericError
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    })
  }
  edit() {
    let formData = this.productForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.product,
      categoryId: formData.category_id,
      price: formData.price,
      description: formData.description,
    }
    this.productService.update(data).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.onEditProduct.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, "success");
      },
      error: (error: any) => {
        this.dialogRef.close();
        this.responseMessage = error.error?.message ? error.error?.message : GlobalConstants.genericError
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    })
  }

}
