import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Products } from '../index/products.model';
import { ProductsServiceService } from 'src/app/services/products-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  cat: any = [
    {
      name: 'All',
      query: 'all'
    },

    {
      name: 'Fashion',
      query: 'fashion',
      type: 'category'
    },
    {
      name: 'Beaulty',
      query: 'beaulty',
      type: 'category'
    },
    {
      name: 'Raw Materials',
      query: 'rawmaterials',
      type: 'category'
    },
  ];
  for = [

    {
      name: 'Men',
      query: 'men',
      type: 'for'
    },
    {
      name: 'Women',
      query: 'women',
      type: 'for'
    },
    {
      name: 'Hair care',
      query: 'haircare',
      type: 'for'
    },
    {
      name: 'Fragrance',
      query: 'fragrance',
      type: 'for'
    }

  ];
  menTitle = [
    {
      icon : 'assets/icon/title/watch.svg',
      title : 'watches'
    },
    {
      icon : 'assets/icon/title/.svg',
      title : 'clothing'
    },
    {
      icon : 'assets/icon/title/shoes.svg',
      title : 'Shoes'
    },
    {
      icon : 'assets/icon/title/wallet.svg',
      title : 'Accessories'
    },
    {
      icon : 'assets/icon/title/chain.svg',
      title : 'Jewelry'
    }
  ];
  womenTitle = [
    {
      icon: 'assets/icon/title/clothes.svg',
      title: 'Clothing',
      query: 'Clothing'
    },
    {
      icon: 'assets/icon/title/female shoe.svg',
      title: 'Shoes',
      query: 'Shoes'
    },
    {
      icon: 'assets/icon/title/watch.svg',
      title: 'watches',
      query: 'watches'
    },
    {
      icon: 'assets/icon/title/jewel.svg',
      title: 'Jewelry',
      query: 'Jewelry'
    },
    {
      icon: 'assets/icon/title/handbag.svg',
      title: 'handbags and wallets',
      query: 'HandbagsAndWallets'
    },
    {
      icon: 'assets/icon/title/glasses.svg',
      title: 'Womens accessories',
      query: 'WomensAccessories'
    },
  ];
  haircareTitle = [
    {
      icon: 'assets/icon/title/hair.svg',
      title: 'Extensions and Wigs',
      query: 'ExtensionsAndWigs'
    },
    {
      icon: 'assets/icon/title/hair care.svg',
      title: 'Hair and Scalp Care',
      query: 'HairAndScalpCare'
    },
    {
      icon: 'assets/icon/title/comb.svg',
      title: 'Hair Accessories',
      query: 'HairAccessories'
    },
    {
      icon: 'assets/icon/title/hair loss.svg',
      title: 'Hair loss porducts',
      query: 'HairLossPorducts'
    },
  ];
  fragranceTitle = [
    {
      icon: 'assets/icon/title/women perfume.svg',
      title: 'Women'
    },
    {
      icon: 'assets/icon/title/perfume men.svg',
      title: 'Men'
    },
    {
      icon: 'assets/icon/title/perfume unisex.svg',
      title: 'Unisex'
    },
  ];
  products: Products[] = [];
  clickedCat: string;
  clickedInfinit: string;

  constructor(private productService: ProductsServiceService, private renderer: Renderer2) { }

  @ViewChild('men', { read: ElementRef, static: true }) men: ElementRef;
  @ViewChild('title', { read: ElementRef, static: true }) title: ElementRef;
  @ViewChild('women', { read: ElementRef, static: true }) women: ElementRef;
  @ViewChild('haircare', { read: ElementRef, static: true }) haircare: ElementRef;
  @ViewChild('fragrance', { read: ElementRef, static: true }) fragrance: ElementRef;

  sliderOpt = {
    spaceBetween: 0,
    slidesPerView: 2.6
  };

  loadMore(event: { target: any; }) {
    console.log(event);
    if (this.clickedInfinit === 'category') {
      this.getMoreCatItems(event);
    } else if (this.clickedInfinit === 'for') {
      this.getMoreForItems(event);
    } else {
      this.getMoreProducts(event);
    }
    // if (this.products.length === 10) {
    //    event.target.disabled = true;
    // }
  }

  loadinitit(type: string) {
    console.log(type);
    this.clickedInfinit = type;
  }


  getClickedProductCat(query: any) {
    console.log(query);
    this.clickedCat = query;
    this.productService.getCategoryProducts(query).subscribe(
      (res) => {
        console.log(res);
        this.products = res;
      }
    );
    this.renderer.addClass(this.title.nativeElement, 'titlesHide');
  }

  getClickedProductFor(qurry: any) {
    console.log(qurry);
    this.clickedCat = qurry;
    this.productService.getForProducts(qurry).subscribe(
      (res) => {
        console.log(res);
        this.products = res;
      }
    );
    this.renderer.removeClass(this.title.nativeElement, 'titlesHide');


    if (qurry === 'men') {
      this.renderer.addClass(this.women.nativeElement, 'titlehide');
      this.renderer.addClass(this.haircare.nativeElement, 'titlehide');
      this.renderer.addClass(this.fragrance.nativeElement, 'titlehide');
      this.renderer.removeClass(this.men.nativeElement, 'titlehide');
    } else if (qurry === 'women') {
      this.renderer.addClass(this.haircare.nativeElement, 'titlehide');
      this.renderer.addClass(this.fragrance.nativeElement, 'titlehide');
      this.renderer.addClass(this.men.nativeElement, 'titlehide');
      this.renderer.removeClass(this.women.nativeElement, 'titlehide');
    } else if (qurry === 'fragrance') {
      this.renderer.addClass(this.haircare.nativeElement, 'titlehide');
      this.renderer.addClass(this.men.nativeElement, 'titlehide');
      this.renderer.addClass(this.women.nativeElement, 'titlehide');
      this.renderer.removeClass(this.fragrance.nativeElement, 'titlehide');
    } else if (qurry === 'haircare') {
      this.renderer.addClass(this.men.nativeElement, 'titlehide');
      this.renderer.addClass(this.women.nativeElement, 'titlehide');
      this.renderer.addClass(this.fragrance.nativeElement, 'titlehide');
      this.renderer.removeClass(this.haircare.nativeElement, 'titlehide');
    }

  }


  getClickedProductTitle(qurry: any) {
    console.log(qurry);
    this.clickedCat = qurry;
    this.productService.getTitleProducts(qurry).subscribe(
      (res) => {
        console.log(res);
        this.products = res;
      }
    );
  }


  getMoreCatItems(event?: { target: { complete: () => void; }; }) {
    this.productService.getCategoryProducts(this.clickedCat).subscribe(
      (res) => {
        console.log(res);
        this.products = this.products.concat(res);
        console.log(this.products);

        if (event) {
          event.target.complete();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getMoreTitleItems(event?: { target: { complete: () => void; }; }) {
    this.productService.getTitleProducts(this.clickedCat).subscribe(
      (res) => {
        console.log(res);
        this.products = this.products.concat(res);
        console.log(this.products);

        if (event) {
          event.target.complete();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getMoreForItems(event?: { target: { complete: () => void; }; }) {
    this.productService.getForProducts(this.clickedCat).subscribe(
      (res) => {
        console.log(res);
        this.products = this.products.concat(res);
        console.log(this.products);

        if (event) {
          event.target.complete();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }


  getMoreProducts(event?: { target: { complete: () => void; }; }) {
    this.productService.getProducts().subscribe(
      (res) => {
        console.log(res);
        this.products = this.products.concat(res);
        console.log(this.products);

        if (event) {
          event.target.complete();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

    getAllProducts() {
    this.productService.getProducts().subscribe(res => {
      console.log(res);
      this.products = res;
    });
  }



  ngOnInit() {
     this.getAllProducts();
  }
}
