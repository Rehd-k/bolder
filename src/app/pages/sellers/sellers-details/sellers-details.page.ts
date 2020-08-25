import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellersService } from 'src/app/services/sellers.service';
import { LikePage } from './like/like.page';
import { PopoverController, ModalController } from '@ionic/angular';
import { CommentsPage } from './comments/comments.page';
import { Sellers } from '../sellers.model';
import { SellerReviewsPage } from './seller-reviews/seller-reviews.page';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Products, Storys } from '../../index/products.model';


@Component({
  selector: 'app-sellers-details',
  templateUrl: './sellers-details.page.html',
  styleUrls: ['./sellers-details.page.scss'],
})
export class SellersDetailsPage implements OnInit {

  stories: Storys[] = [{
    _id: '12345',
    title: 'Turtle Neck',
    Subtitle: 'Newest turtle neck stright from the lab',
    storyMedia: [{
      public_id: 'ttt',
      url: '/assets/images/person-holding-black-backpack-3731256.jpg'
    }],
    storyText: 'Keep close to Natures heart... and break clear away, once in awhile, ' +
      'and climb a mountain or spend a week in the woods. Wash your spirit clean.',
    React: [{
      reactor: 'string',
      reaction: 'string'
    }],
    Comments: [{
      author: 'string',
      commentText: 'string'
    }]
  },
  {
    _id: '123456',
    title: 'Turtle Neck',
    Subtitle: 'Newest turtle neck stright from the lab',
    storyMedia: [{
      public_id: 'ttt',
      url: '/assets/images/person-holding-black-backpack-3731256.jpg'
    }],
    storyText: '',
    React: [{
      reactor: 'string',
      reaction: 'string'
    }],
    Comments: [{
      author: 'string',
      commentText: 'string'
    }]
  }];

  loadedSeller: Sellers;
  sellersItems: Products[] = [];
  sellerStories: Storys[]  = [];
  selectedSlide: any;
  segment = 'stories';
  value: string;
  cSegment = 'about';
  reviewed = true;
  followed: boolean;
  userinfo: any;
  usless;
  allFollowed = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private sellerService: SellersService,
    private popoverController: PopoverController,
    private modalCtrl: ModalController,
    private storage: Storage,
    private helper: JwtHelperService
  ) { }
  reviewSlider = {
    initialSlide: 0,
    spaceBetween: 0,
    direction: 'horizontal',
    speed: 300,
    effect: 'slide',
    slidesPerView: 1.2,
  };


  async like(ev: any) {
    const popover = await this.popoverController.create({
      component: LikePage,
      cssClass: 'like-style',
      translucent: true,
      componentProps: {
        story_id: ev
      }
    });
    return await popover.present();
  }
  async OpenReviews() {
    const modal = await this.modalCtrl.create({
      component: SellerReviewsPage,
      cssClass: 'seller-review-style',
      componentProps: {
        Reviews: this.loadedSeller,
        // User: this.userinfo.firstName

      }
    });
    await modal.present();
  }

  isFollowed() {
    this.sellerService.isFollowed().subscribe(
      res => {
        this.allFollowed = res;
        const check = () => {
          let theThing: boolean;
          for (const result of this.allFollowed) {
            theThing = result.SellerName === this.loadedSeller.companyName;
          }
          return theThing;
        };
        if (res.some(check)) {
          this.followed = true;
        } else {
          this.followed = false;
        }
      }
    );
  }




  follow() {
    const details = {
      email: this.userinfo.email,
      name: this.userinfo.firstName,
      SellerName: this.loadedSeller.companyName,
      SellerLogo: this.loadedSeller.companyLogo
    };
    console.log(details);
    this.sellerService.toFollow(details).subscribe(
      res => {
        this.allFollowed.concat(res);
        console.log(res);
      }
    );
    this.followed = true;
  }

  unfollow() {
    const FIndToRemove = () => {
      let theThing: boolean;
      for (const result of this.allFollowed) {
        theThing = result.SellerName === this.loadedSeller.companyName;
      }
      return theThing;
    };
    const it = this.allFollowed.find(FIndToRemove);
    console.log(it._id);
    this.sellerService.unFollow(it._id, this.loadedSeller._id).subscribe();
    this.followed = false;
  }



  async comment(id: string) {

    const FIndToComment = () => {
      let theThing: boolean;
      for (const story of this.sellerStories) {
        theThing = story._id === id;
      }
      return theThing;
    };
    const toCommect = this.allFollowed.find(FIndToComment);
    const modal = await this.modalCtrl.create({
      component: CommentsPage,
      cssClass: 'comment-style',
      componentProps: {
        storyId: toCommect.Comments
      },
    });
    await modal.present();
  }


  getproducts() {
    const products = this.loadedSeller.companyName;
    this.sellerService.getsellerProducts(products).subscribe((res) => {
      console.log('details: ', res);
      this.sellersItems = res;
    });
  }


  loadMoreProducts(event?) {
    this.sellerService.getSellers()
      .subscribe(res => {
        console.log(res);
        this.sellersItems = this.sellersItems.concat(res);
        console.log(this.sellersItems);
      }, err => {
        console.log(err);
      });
  }


  getStories() {
    this.sellerService.getStroies()
      // .subscribe(res => this.sellerStories = res);
  }
// remeber that chamging seller stories  to stories stuff ooo

  loadMoreStories(event?) {
    this.sellerService.getSellers()
      .subscribe(res => {
        console.log(res);
        this.sellerStories = this.sellerStories.concat(res);
        console.log(this.sellerStories);
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('sellerId');
    this.sellerService.getSellerById(id).subscribe((res) => {
      console.log('details: ', res);
      this.loadedSeller = res;
    });

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const productId = paramMap.get('productId');
      this.usless = this.sellerService.getSellerById(productId);
      this.loadedSeller = this.usless;
    });
    this.isFollowed();

    this.storage.get('access_Token').then(token => {
      const decoded = this.helper.decodeToken(token);
      const isExpired = this.helper.isTokenExpired(token);
      if (!isExpired) {
        this.userinfo = decoded;
        console.log('decoded: ', this.userinfo);
      } else {
        this.storage.remove('access_Token');
      }
    });

  }

}

