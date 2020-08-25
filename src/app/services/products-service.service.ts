import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/';
import { environment } from '../../environments/environment';
import { ProductsSpec } from '../pages/index/product-details/products.model';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class ProductsServiceService {
  private apiBaseUrl = environment.url;

  constructor(private http: HttpClient, private st: Storage) { }

  private extractData(res: ProductsSpec) {
    const body = res;
    return body;
  }
  getProducts(): Observable<any> {
    return this.http
      .get(this.apiBaseUrl)
      .pipe(map(this.extractData));
  }


  public getProductById(productId: string) {
    return this.http
      .get(`${this.apiBaseUrl}findone/${productId}`)
      .pipe(map(this.extractData));
  }

  public getSaved() {

    return this.http.get(`${this.apiBaseUrl}generic/save`);
    // Still considering the whole data base thingy...


  //   this.http.get(`${this.apiBaseUrl}generic/save`).subscribe(

  //     res => {
  //       this.st.set('Saved Products', res);
  //     }

  //   );
  //   return this.st.get('Saved Products');
  // }
  }


  public saveProduct(save: any) {
    return this.http.post(`${this.apiBaseUrl}generic/save`, save).pipe(
      map(
        res => {
          this.st.set('Saved Products', res);
          return res;
        }
      )
    );
  }

  public unSaveProduct(savedId: any) {
    return this.http.delete(`${this.apiBaseUrl}generic/saved/${savedId}`).pipe(
      map(
        res => {
          this.st.set('Saved Products', res);
          return res;
        }
      )
    );
  }



  public getReviews(productId: string) {
    return this.http
      .get(`${this.apiBaseUrl}findone/${productId}/reviews`)
      .pipe(map(this.extractData));
  }

  public getsearch(search: string) {
    return this.http
      .get(`${this.apiBaseUrl}search/${search}`)
      .pipe(map(this.extractData));
  }




  public getCategoryProducts(categoryName: string): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}cat/${categoryName}`)
      .pipe(map(this.extractData));
  }

  public getTitleProducts(titleName: string): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}title/${titleName}`)
      .pipe(map(this.extractData));
  }

  public getForProducts(forName: string): Observable<any> {
    return this.http
      .get(`${this.apiBaseUrl}for/${forName}`)
      .pipe(map(this.extractData));
  }
}
