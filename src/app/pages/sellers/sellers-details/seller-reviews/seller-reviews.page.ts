import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SellersService } from 'src/app/services/sellers.service';


@Component({
  selector: 'app-seller-reviews',
  templateUrl: './seller-reviews.page.html',
  styleUrls: ['./seller-reviews.page.scss'],
})
export class SellerReviewsPage implements OnInit {

  @Input() Reviews: any;
  @Input() reason: any;

  addingReview = false;
  starRating: number;
  reviewHeader: string;
  reviewText: string;

  constructor(private modalController: ModalController, private renderer: Renderer2, private sellerService: SellersService) { }



  @ViewChild('review', { read: ElementRef, static: true }) review: ElementRef;

  dismiss() {
    this.modalController.dismiss();
  }

  addReviewBtn() {
    this.renderer.addClass(
      this.review.nativeElement, 'review_animation'
    );
    this.addingReview = true;
  }
  removeReviewBtn() {
    this.renderer.removeClass(
      this.review.nativeElement, 'review_animation'
    );
    this.addingReview = false;
  }



  addReview() {
    const review = {
      author : this.reviewHeader,
      reviewHeader: this.reviewHeader,
      reviewText: this.reviewText,
      rating: this.starRating
    };
    this.sellerService.addSellerReview(review).subscribe();
  }

  updateReview() {
    const review = {
      _id: this.Reviews._id,
      author : this.reviewHeader,
      reviewHeader: this.reviewHeader,
      reviewText: this.reviewText,
      rating: this.starRating
    };
    this.sellerService.updateReview(review).subscribe();
  }

  ngOnInit() {
    console.log(this.Reviews);
  }

}
