import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IonContent, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { CartService } from 'src/app/services/cart.service';
import { cartItems } from '../../cart/cart.model';
import { DescriptionsPage } from './descriptions/descriptions.page';
import { ReviewsPage } from './reviews/reviews.page';
import { ProductsSpec } from './products.model';


@Component({
  selector: '[id=myid]',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsServiceService,
    private cartService: CartService,
    private router: Router,
    private renderer: Renderer2,
    private modalCtrl: ModalController
  ) { }

  // Declration of variables
  public color = '';
  public size = '';
  public cartItemCount: BehaviorSubject<number>;
  public loadedProduct: ProductsSpec;
  public carthings: any;
  private observer: IntersectionObserver;
  public rootElement: any;
  public clickedimage: string;
  public loadedimage: any;
  public disableButton: boolean;
  public related: any;
  public loadedReviews: any;
  public useless: any;
  public saved: boolean;
  public savedId: string;



  /*
  DOM options
  */

  // IonContnt
  @ViewChild(IonContent, { read: ElementRef, static: true })
  contentarea: ElementRef;
  // Trigger Element
  @ViewChild('triggerElement', { read: ElementRef, static: true })
  triggerElement: ElementRef;

  // Slider options
  sliderOpt = {
    spaceBetween: 30,
    slidesPerView: 2.6,
  };

  RealtedslidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    spaceBetween: 10,
    slidesPerView: 2.6,
  };

  /*
   Methords
*/


  openCart() {
    this.router.navigate(['cart']);
  }
  addToCart(product: cartItems) {
    this.cartService.addProduct(product);
  }

  save() {
    const follow = {
      _id: this.loadedProduct._id,
      Title: this.loadedProduct.Title,
      Image: this.loadedProduct.Images[0],
      Price: this.loadedProduct.Price,
      Subtitle: this.loadedProduct.Subtitle,
      Producer: this.loadedProduct.Producers,
      color: this.color,
      size: this.size
    };
    this.productService.saveProduct(follow).subscribe(
      res => {
        this.saved = true;
      }
    );
  }

  getSaved() {
    // ...countinued from your service ...althouhg it seems as tho the thing no one gree like i care
    // i just thougt as well how about it dossnt really do the DB if does it on initallization and
    // secondly on login then no where else again .
    // others weill then be from the local storage
    // this.productService.getSaved().then(
    //   result => {

    //     console.log(result);

    //   }
    // );
    this.productService.getSaved().subscribe(
      res => {
        // const leg = () => {
        //   for (const result of res) {
        //     if (result.itemId === this.loadedProduct._id) {
        //       this.savedId = result._id;
        //       return true;
        //     }
        //   }
        // };
        // if (res.some(leg)) {
        //   this.saved = true;
        // }
      }
    );
  }

  unSave() {
    const savedId = this.savedId;
    this.productService.unSaveProduct(savedId).subscribe();
    this.saved = false;

  }

  ionViewWillEnter() {
    this.getloadedItem();
    this.getclickedItem();
  }
  checkSaved() {

  }
  ngOnInit() {
    this.getloadedItem();
    this.getclickedItem();
    this.observers();
    this.cartItemCount = this.cartService.getCartItmCount();
  }
  ionViewDidEnter() {
    // this.toLoad();
    this.getRelated(this.loadedProduct.Title);
    this.getSaved();
  }
  toLoad() {
    setTimeout(() => {
      const image = this.loadedProduct.Images;
      // let x: { url: any };
      for (const x of image) {
        var imgToLoad = x;
      }
      this.rootElement = document.getElementById('myid');
      const loaded = `url(${imgToLoad.url}) top left / 100% 450px`;
      this.renderer.setStyle(this.rootElement, 'background', loaded);
      console.log(imgToLoad.url);
    }, 10);
  }

  // getLoadedImage() {
  //   var image = this.loadedProduct.Images;
  //   const imgArr = image;
  //   let x: { url: any };
  //   for (let x of imgArr) {
  //     var house = x;
  //   }
  //   console.log(house.url);
  // }

  getclickedImage(url: any) {
    console.log(url);
    this.clickedimage = `url(${url}) top left / 100% 450px`;
    this.rootElement = document.getElementById('myid');
    console.log(this.rootElement);
    console.log(this.loadedimage);
    this.renderer.setStyle(this.rootElement, 'background', this.clickedimage);
  }

  getclickedItem() {
    let productId: string;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      productId = paramMap.get('productId');
    });
    this.useless = this.productService.getProductById(productId);
    this.loadedProduct = this.useless;
  }


  getloadedItem() {
    const id = this.activatedRoute.snapshot.paramMap.get('productId');
    this.productService.getProductById(id).subscribe((res) => {
      console.log('details: ', res);
      this.loadedProduct = res;
    });
  }

  getRelated(title: string) {
    this.productService.getTitleProducts(title).subscribe((res) => {
      console.log('related: ', res);
      this.related = res;
    });
  }

  getReview() {
    const id = this.activatedRoute.snapshot.paramMap.get('productId');
    this.productService.getReviews(id).subscribe((res) => {
      console.log('reviews: ', res);
      this.loadedReviews = res;
    });
  }

  toCart() {
    const carthings = {
      _id: this.loadedProduct._id,
      Title: this.loadedProduct.Title,
      Image: this.loadedProduct.Images[0].url,
      Price: this.loadedProduct.Price,
      amount: this.loadedProduct.amount,
      Subtitle: this.loadedProduct.Subtitle,
      color: this.color,
      size: this.size,
    };
    this.addToCart(carthings);
    console.log(carthings);
  }


  async presentReviewModal() {
    const modal = await this.modalCtrl.create({
      component: ReviewsPage,
      cssClass: 'reviews',
      componentProps: {
        review: this.loadedProduct._id
      }
    });

    await modal.present();

  }

  async presentdescriptionModal() {
    const modal = await this.modalCtrl.create({
      component: DescriptionsPage,
      cssClass: 'description',
      componentProps: {
        Description: this.loadedProduct.Description
      }
    });
    return await modal.present();
  }

  observers() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          this.renderer.removeClass(
            this.contentarea.nativeElement,
            'no-transform'
          );
          console.log('out');
        } else {
          this.renderer.addClass(
            this.contentarea.nativeElement,
            'no-transform'
          );
          console.log('enter');
        }
      });
    });
    this.observer.observe(this.triggerElement.nativeElement);
  }
}
