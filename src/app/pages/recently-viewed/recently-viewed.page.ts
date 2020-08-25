import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.page.html',
  styleUrls: ['./recently-viewed.page.scss'],
})
export class RecentlyViewedPage implements OnInit {

 
  products = [];  

  constructor(private http: HttpClient) {
     this.loadProducts();
  }

  loadProducts(event?: { target: { complete: () => void; }; }) {
    this.http.get('https://my.api.mockaroo.com/products.json?key=a7bff130')
    .subscribe(stuff => {
      console.log(stuff);
      this.products = this.products.concat(stuff);
      
      if(event) {
        event.target.complete();
      }
    });
  }
  

  loadMore(event: any) {
    console.log(event)
    this.loadProducts(event) 


  }

  ngOnInit() {
  }

}
