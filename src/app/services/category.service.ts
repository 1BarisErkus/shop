import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { Category } from '../category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  path = "http://localhost:3000/categories";

  constructor(
    private http: HttpClient
  ) { }

  getCategories(){
    return this.http.get<Category[]>(this.path).pipe(
      tap(),
      catchError(this.handleError)
    )
  }
  handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if(err.error instanceof ErrorEvent){
      errorMessage = `Bir hata oluştu: ${err.error.message}`
    }
    else{
      errorMessage = 'Sistemsel bir hata';
    }

    return throwError(() => new Error(errorMessage))
  }
  
}
