import { ProductDetailsComponent } from '../../products/product-details/product-details.component';
import { AddProductComponent } from '../../products/add-product/add-product.component';
import {HttpClient} from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {Product} from "../../products/products model";
import { ProductService} from "../../../shared/services/product.service";
import { CategoryService } from 'src/app/shared/services/category.service';
import {MatDialog , MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';


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
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'price', 'category' , 'image'];
  // exampleDatabase!: ExampleHttpDatabase | null;
  exampleDatabase!: ProductService | null;


  data: Product[] = [];
  Products: Product[] = []

  resultsLength = 0;
  limit = 10;

  isLoadingResults = false;
  isRateLimitReached = false;
  categoriesList :string[] = []
  toppings = new FormControl('');
  selected=''
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _httpClient: HttpClient ,private _CategoryService : CategoryService, private _ProductService : ProductService ,private _MatDialog:MatDialog, private router : Router
    )
    {
      this.dataSource = new MatTableDataSource(this.Products);


    }

    ngOnInit(): void {
      this.getAllCategory();
    }



  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }


  handleFilter(event:any)
  {
    this._CategoryService.getprodCategories(this.selected).subscribe(res=>{
      console.log('prodcat' , res)
      this.Products = res as Product[]
      this.dataSource = new MatTableDataSource(this.Products);

      // this.dataSource.filter = this.selected.trim().toLowerCase();
    } , err=>{})
    // this.dataSource.filter = this.selected.trim().toLowerCase();
    // console.log(event);
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


  getAllCategory()
  {
    this._CategoryService.getCategories().subscribe(res=>{
      console.log(res) ;
      this.categoriesList = res as string[];
    } , err=>{})
  }



}

