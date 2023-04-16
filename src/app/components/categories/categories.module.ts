import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
