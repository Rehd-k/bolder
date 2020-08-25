import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { Storage } from '@ionic/storage';
import { GenericService } from 'src/app/services/generic.service';
import { ProductsSpec, Advert } from './product-details/products.model';



@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  // products: ProductsSpec[] = [];
  advert: Advert[] = [];

  constructor(
    private productService: ProductsServiceService,
    private storage: Storage,
    private GenService: GenericService

  ) {}
  /*            Slider logic     */

  sliderOpt = {
    spaceBetween: 10,
    slidesPerView: 1.6,
    centeredView: true,
  };

  /*            Get products from api logic   */

  getMoreProducts(event?: { target: { complete: () => void; }; }) {
    this.GenService.getAdvertStuff().subscribe(res => {
      this.advert = this.advert.concat(res);
      if (event) {
        event.target.complete();
      }
    });
  }

  getAdvert() {
    this.GenService.getAdvertStuff().subscribe(res => {
      // this.advert = res;
    });
  }


  loadMore(event: { target: any; }) {
    console.log(event);
    this.getMoreProducts(event);
  }


  ngOnInit() {
    this.getAdvert();

    this.storage.get('access_Token').then((Token) => {
      console.log(` ${Token}! `);
    });
  }
}
