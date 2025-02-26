import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) { };

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(tap(data => console.log('All', JSON.stringify(data))),
    catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMesssage = '';
    if (err.error instanceof ErrorEvent){
      errorMesssage = `An error occured: ${err.error.message}`;
    } else {
      errorMesssage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMesssage);
    return throwError(()=>errorMesssage);
  }
}
