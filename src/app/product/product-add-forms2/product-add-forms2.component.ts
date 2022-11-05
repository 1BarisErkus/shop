import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product';
declare let alertify: any;

@Component({
  selector: 'app-product-add-forms2',
  templateUrl: './product-add-forms2.component.html',
  styleUrls: ['./product-add-forms2.component.css'],
  providers: [CategoryService, ProductService]
})
export class ProductAddForms2Component implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  productAddForm: FormGroup = this.formBuilder.group({});
  product: Product = new Product();
  categories: Category[] = [];

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group(
      {
        name: ["", Validators.required],
        description: ["", Validators.required],
        price: ["", Validators.required],
        categoryId: ["", Validators.required],
      }
    );
  }

  ngOnInit(): void {
    this.createProductAddForm();
    this.categoryService.getCategories().subscribe(
      (data) => this.categories = data
    );
  }

  add() {
    if (this.productAddForm.valid) {
      this.product = Object.assign({}, this.productAddForm.value);
    }

    this.productService.addProduct(this.product).subscribe(data => {alertify.success('Ürün Eklendi')});
  }

}
