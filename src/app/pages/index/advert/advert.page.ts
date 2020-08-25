import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/services/generic.service';
import { Advert } from '../product-details/products.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.page.html',
  styleUrls: ['./advert.page.scss'],
})
export class AdvertPage implements OnInit {
  Adverts: Advert[] = [];
  advertString: string;

  constructor(
    private generic: GenericService,
    private activatedRoute: ActivatedRoute
  ) { }

  loadMore(event: { target: any; }) {
    console.log(event);
    this.getMoreProducts(event);
  }

  getMoreProducts(event?: { target: { complete: () => void; }; }) {
    this.generic.getAdvertStuff().subscribe(res => {
      this.Adverts = this.Adverts.concat(res);
      if (event) {
        event.target.complete();
      }
    });
  }
  getAdvert() {
    const id = this.activatedRoute.snapshot.paramMap.get('advert');
    this.advertString = id;
    this.generic.getAdvertString(id).subscribe((res) => {
      console.log('details: ', res);
      // this.Adverts = res;
    });
  }

  ngOnInit() {
    this.getAdvert();
  }

}
