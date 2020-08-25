import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/';
import { environment } from '../../environments/environment';
import { Sellers } from '../pages/sellers/sellers.model';

@Injectable({
  providedIn: 'root'
})
export class SellersService {

  private apiBaseUrl = environment.url;



  constructor(private http: HttpClient) { }

  private extractData(res: Sellers) {
    const body = res;
    return body;
  }
  public getSellers(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}sellers`).pipe(
      map(this.extractData)
    );
  }

  public addSellerReview(reviewItems) {
    return this.http.post(`${this.apiBaseUrl}seller/review`, reviewItems);
  }

  public updateReview(reviewItems) {
    return this.http.put(`${this.apiBaseUrl}seller/review`, reviewItems);
  }


  public getSearchResult(filter: string, searchText: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}sellers/search/${filter}/${searchText}`).pipe(
      map(this.extractData)
    );
  }

  public getFilter(filter: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}sellers/filter/${filter}`).pipe(
      map(this.extractData)
    );
  }

  public getSellerById(sellerId: string) {

    return this.http.get(`${this.apiBaseUrl}sellers/seller/${sellerId}`).pipe(
      map(this.extractData)
    );

  }

  public toFollow(details) {
    return this.http.post(`${this.apiBaseUrl}generic/follow`, details).pipe(
      map(res => {
        return res;
      })
    );
  }

  public unFollow(savedId: string, sellerId: string) {
    return this.http.delete(`${this.apiBaseUrl}generic/follow/${savedId}/${sellerId}`);
}


  public isFollowed(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}generic/follow`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getsellerProducts(sellerName: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}sellers/iterms/${sellerName}`).pipe(
      map(this.extractData)
    );
  }

  public getStroies() {
    return this.http.get(`${this.apiBaseUrl}sellers/Stories`).pipe(
      map(this.extractData)
    );
  }

}
