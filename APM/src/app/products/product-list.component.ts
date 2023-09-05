import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string ='';
  sub!: Subscription;

  private _listFilter: string = '';
  get listFilter(): string  {
    return this._listFilter;
  }
  set listFilter(value: string) {
      this._listFilter = value;
      console.log('In setter :' + value);
      this.filteredProducts = this.performFilter(value);
  }

  products: IProduct[] = [];
  filteredProducts: IProduct[] = this.products;

  constructor(private productService: ProductService) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  performFilter(value: string): IProduct[] {
    value = value.toLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(value));
  }

  toggleImage(): void{
    this.showImage = ! this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    })
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}
