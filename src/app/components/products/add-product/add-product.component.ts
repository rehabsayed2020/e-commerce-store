import { Component, OnInit, Inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { ProductService} from "../../../shared/services/product.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { map } from "rxjs/operators";
// import { ToastrService } from "ngx-toastr";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


  value = "";
  matcher = new MyErrorStateMatcher();
  public creatNewProduct!: FormGroup;
  // minDate: Date;
  // maxDate: Date;
  fileToUpload!: File;
  formData = new FormData();
  showLoading = false;
  sucess = false

  constructor(
    private fg: FormBuilder,
    private _ProductService: ProductService,
    // private _ToastrService: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    // const currentYear = new Date().getFullYear();
    // this.minDate = new Date(currentYear - 20, 0, 1);
    // this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit() {
    this.formCreatBuilder();
  }



  onSubmit() {
    if (this.creatNewProduct.invalid) {
      return;
    }
    let senddata =
    {
      title: this.creatNewProduct.controls["title"].value,
      price: this.creatNewProduct.controls["price"].value,
      description: this.creatNewProduct.controls["description"].value,
      category: this.creatNewProduct.controls["category"].value,
      image: 'https://i.pravatar.cc'

  }


  this._ProductService.addProduct(senddata).subscribe(result => {
    this.sucess = true;
    console.log('done')

setTimeout(() => {
  // this.sucess = false;

}, 2000);
 this.onNoClick();
  }, error=> {
     alert('error')
  });

  }

  formCreatBuilder() {
    this.creatNewProduct = this.fg.group({
      title: ["", Validators.required],
      price: ["", Validators.required],
      category: ["", Validators.required],
      description: ["", Validators.required],
      image: [""]
    });
  }



  onNoClick(): void {
    this.dialogRef.close();
  }
}
