import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { GenericService } from 'src/app/services/generic.service';
import { ModalController } from '@ionic/angular';
import { SearchPage } from 'src/app/pages/search/search.page';


@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  cartItemCount: BehaviorSubject<number>;
  searching = false;
  searchResults = [];
  searchControl: FormControl;

  constructor(
    private cartService: CartService,
    private router: Router,
    private modalController: ModalController
  ) { }

  async searchModel() {
    const modal = await this.modalController.create({
    component: SearchPage,
    });
    await modal.present();
  }
  openCart() {
    this.router.navigate(['cart']);
  }

  ngOnInit() {
    setTimeout(() => {
      this.cartItemCount = this.cartService.getCartItmCount();
    }, 3000);

  }

}




