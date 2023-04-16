import { ProductDetailsComponent } from './../product-details/product-details.component';
import { AddProductComponent } from './../add-product/add-product.component';
import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {Product} from "../products model";
import { ProductService} from "../../../shared/services/product.service";
import {MatDialog , MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';


// import {MatDialogConfig} from '@angular/material/dialog'

/**
 * @title Table retrieving data through HTTP
 */

 export interface FakeApi {
  items: Product[];
  total_count: number;
  length:number
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements AfterViewInit  {

  displayedColumns: string[] = ['title', 'price', 'category' , 'image','action'];
  // exampleDatabase!: ExampleHttpDatabase | null;
  exampleDatabase!: ProductService | null;


  data: Product[] = [];

  resultsLength = 0;
  limit = 10;

  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _httpClient: HttpClient , private _ProductService : ProductService ,private _MatDialog:MatDialog, private router : Router
    ) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ProductService(this._httpClient);
    // this.exampleDatabase = new this._ProductService(this._httpClient);


    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this._ProductService!.getProducts(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.limit

          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          // this.data = data as Product[];
          console.log(data)

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.

          // this.resultsLength = data.total_count;
          // this.resultsLength = data.items.length;
          // console.log(data)

          this.limit = +10
          this.resultsLength = 20

          return data;
        }),
      )
      // .subscribe(res=>(console.log(res)))
      .subscribe((data : any) =>{ (this.data = data)
       console.log(data) }
      );
  }

  onAdd()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='40%';
    this._MatDialog.open(AddProductComponent,dialogConfig).afterClosed().subscribe(()=>
    {
      // this.getAllissues();
    })

  }

  addproduct() {
    this.router.navigateByUrl('/products/add');

  }

  datarow(row:any)
  {
    this._ProductService.setproductId(row.id);
    // this.router.navigateByUrl('/products/details');
    this.onView();


  }
  onView()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='40%';
    this._MatDialog.open(ProductDetailsComponent,dialogConfig).afterClosed().subscribe(()=>
    {
      // this.getAllissues();
    })
  }

  deleteProd(id:any)
  {
    this._ProductService.deleteProduct(id).subscribe((res)=>{} , err=>{} )

  }



}




