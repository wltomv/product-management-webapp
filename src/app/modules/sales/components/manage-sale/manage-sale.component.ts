import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/modules/shared/global-constants';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-manage-sale',
  templateUrl: './manage-sale.component.html',
  styleUrls: ['./manage-sale.component.scss']
})
export class ManageSaleComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total', 'edit']
  dataSource: any = [];
  manageSaleForm: any = FormGroup;
  categories: any = [];
  products: any = [];
  currentProduct: any;
  price: any;
  totalAmount: number = 0;
  responseMessage: any;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private snackbarService: SnackbarService,
    private billService: BillService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.manageSaleForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.email]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      paymentMethod: [null, [Validators.required]],
      product: [null, [Validators.required]],
      category: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, [Validators.required]],
      discount: [0, [Validators.required, Validators.pattern(GlobalConstants.onlyNumbers)]],
      total: [0, [Validators.required]],
    })
    this.getCategorys();
    this.ngxService.stop();
  }

  getCategorys() {
    this.categoryService.getCategorys().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.categories = response;
      },
      error: (error: any) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message ? error.error?.message : GlobalConstants.genericError
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }

  getProductsByCategory(value: any) {
    this.productService.getProductsByCategory(value.id).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.products = response;
        this.manageSaleForm.controls['price'].setValue('');
        this.manageSaleForm.controls['quantity'].setValue('');
        this.manageSaleForm.controls['total'].setValue(0);
      },
      error: (error) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message ? error.error?.message : GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    })
  }

  getProductDetails(value: any) {


    this.productService.getProductById(value.id).subscribe({
      next: (response: any) => {
        this.price = response.price;
        this.manageSaleForm.controls['price'].setValue(response.price);
        this.manageSaleForm.controls['quantity'].setValue('1');
        this.manageSaleForm.controls['total'].setValue(this.price * 1);
        this.currentProduct = response;
      },
      error: (error) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message ? error.error?.message : GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    })
  }


  setQuantity(value: any) {
    var temp = this.manageSaleForm.controls['quantity'].value;
    if (temp > 0) {
      this.manageSaleForm.controls['total'].setValue(this.manageSaleForm.controls['quantity'].value * this.manageSaleForm.controls['price'].value)
    }
    else if (temp != '') {
      this.manageSaleForm.controls['quantity'].setValue('1');
      this.manageSaleForm.controls['total'].setValue(this.manageSaleForm.controls['quantity'].value * this.manageSaleForm.controls['price'].value)
    }
  }

  setDiscount(value: any) {
    var discount = this.manageSaleForm.controls['discount'].value;
    if (discount >= 0) {
      const newPrice = this.currentProduct.price - discount;
      this.manageSaleForm.controls['price'].setValue(newPrice);
      const calculation = this.manageSaleForm.controls['quantity'].value * this.manageSaleForm.controls['price'].value;
      this.manageSaleForm.controls['total'].setValue(calculation)
    }
    else if (discount != '') {
      this.manageSaleForm.controls['discount'].setValue('0');
      const calculation = this.manageSaleForm.controls['quantity'].value * this.manageSaleForm.controls['price'].value;
      this.manageSaleForm.controls['total'].setValue(calculation)
    }
  }

  validateProductAdd(): boolean {
    if (this.manageSaleForm.controls['total'].value === null ||
      this.manageSaleForm.controls['quantity'].value <= 0 ||
      !(this.manageSaleForm.controls['discount'].valid)
    ) {
      return true;
    }
    else return false;
  }

  validateSubmit() {
    if (
      this.totalAmount == 0 ||
      this.manageSaleForm.controls['name'].value === null ||
      this.manageSaleForm.controls['email'].value === null ||
      this.manageSaleForm.controls['contactNumber'].value === null ||
      this.manageSaleForm.controls['paymentMethod'].value === null ||
      !(this.manageSaleForm.controls['contactNumber'].valid) ||
      !(this.manageSaleForm.controls['email'].valid)
    ) return true;
    else return false;

  }
  add() {
    console.log(this.dataSource);

    var formData = this.manageSaleForm.value;
    var productName = this.dataSource.find((e: { id: number; }) => e.id === formData.product.id);
    if (productName === undefined) {
      this.totalAmount = this.totalAmount + formData.total;
      this.dataSource.push({
        id: formData.product.id,
        name: formData.product.product,
        category: formData.category.category,
        quantity: formData.quantity,
        price: formData.price,
        total: formData.total
      });
      this.dataSource = [...this.dataSource];
      this.snackbarService.openSnackBar(GlobalConstants.productAdded, "success");
    } else {
      this.snackbarService.openSnackBar(GlobalConstants.productExistError, GlobalConstants.error);
    }
  }

  handleDeleteAction(value: any, element: any) {
    this.totalAmount = this.totalAmount - element.total;
    this.dataSource.splice(value, 1);
    this.dataSource = [...this.dataSource];
  }

  submitAction() {
    this.ngxService.start();
    let formData = this.manageSaleForm.value;
    let data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      totalAmount: this.totalAmount,
      productDetails: this.dataSource
    }
    this.billService.generateReport(data).subscribe({
      next: (response: any) => {
        this.downloadFile({ uuid: response.uuid, ...data });
        this.manageSaleForm.reset();
        this.dataSource = [];
        this.totalAmount = 0;

      },
      error: (error) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message ? error.error?.message : GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    })
  }

  downloadFile(data: any) {
    this.ngxService.start();
    let fileName = data.uuid;

    this.billService.getPDF(data).subscribe({
      next: (response: any) => {
        saveAs(response, fileName + '.pdf');
        this.ngxService.stop();
      }
    })
  }
}
