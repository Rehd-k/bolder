import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Advert } from '../pages/index/product-details/products.model';


@Injectable({
  providedIn: 'root'
})
export class GenericService {
  url = environment.url;


  private extractAdvertData(res: Advert) {
    const body = res;
    return body;
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) {}
  saveProduct(saveItem: any ) {
    return this.http.post(`${this.url}generic`, saveItem).pipe(
    );
  }
  unsave(unsave: any) {
    return this.http.delete(`${this.url}generic/${unsave}`).pipe(
    );
  }

  getAdvertStuff() {
    return this.http.get(`${this.url}generic/advert`).pipe(
      map(this.extractAdvertData)
    );
  }

  getAdvertString(adertString: any) {
    return this.http.get(`${this.url}generic/advert/${adertString}`).pipe(
      map(this.extractAdvertData)
    );
  }
  getSaved() {
    return this.http.get(`${this.url}generic`).pipe(
    );
  }
  doSearch(searchText: any, skip: number): Observable<any>  {
      return this.http.get(`${this.url}search/${searchText}/${skip}`).pipe(
        map(this.extractData)
      );
  }
}
