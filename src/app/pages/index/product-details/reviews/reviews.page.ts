import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductsServiceService } from 'src/app/services/products-service.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  @Input() Review: string;
  loadedReviews: any;
  review = this.Review;


  constructor(
    private modalCtrl: ModalController,
    private productsService: ProductsServiceService
  ) { }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  getReviews() {
    const review = this.Review;
    this.productsService.getReviews(review).subscribe(res => {
      this.loadedReviews = res;
    });
  }

  ngOnInit() {
    this.getReviews();
  }

}
