import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from '../product/product';
import { tap, catchError, throwError, Observable } from 'rxjs';

@Injectable()
export class ProductService {

  path = "http://localhost:3000/products";

  constructor(
    private http: HttpClient
  ) { }

  getProducts(categoryId: number): Observable<Product[]> {

    let newPath = this.path;

    if (categoryId) {
      newPath += "?categoryId=" + categoryId;
    }

    return this.http.get<Product[]>(newPath).pipe(
      tap(),
      catchError(
        this.handleError
      )
    );
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `Bir hata oluştu: ${err.error.message}`
    }
    else {
      errorMessage = 'Sistemsel bir hata';
    }

    return throwError(() => new Error(errorMessage));
  }

  addProduct(product: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token'
      })
    }
    return this.http.post<Product>(this.path, product, httpOptions).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

}
