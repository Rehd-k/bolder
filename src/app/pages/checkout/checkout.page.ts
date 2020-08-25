import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {
  InAppBrowser,
  InAppBrowserEvent,
  InAppBrowserObject,
} from '@ionic-native/in-app-browser/ngx';
import { Rave, RavePayment, Misc } from 'rave-ionic4';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  constructor(
    private alertController: AlertController,
    private rave: Rave,
    private ravePayment: RavePayment,
    private misc: Misc,
    private iab: InAppBrowser,
    private router: Router
  ) {}
amount = 50000;
url = this.router.url;
  ravePay() {
    this.rave.init(false, 'FLWPUBK_TEST-6b1827b2ec76e6c0f233edfde2e1518a-X')
    .then(_ => {
      const paymentObject = this.ravePayment.create({
        customer_email: 'coolmirth35@gmail.com',
        amount: this.amount,
        customer_phone: '234099940409',
        redirect_url : 'http://localhost:3000/api/handle_redirect',
        currency: 'NGN',
        txref: `REHD-${Date.now()}`,
        meta: [{
            metaname: 'flightID',
            metavalue: 'AP1234'
        }]
    });
      this.rave.preRender(paymentObject)
        .then(secureLink => {
          secureLink = secureLink + ' ';
          const browser: InAppBrowserObject = this.rave.render(secureLink, this.iab);
          browser.on('loadstop')
              .subscribe((event: InAppBrowserEvent) => {
                if (event.url.indexOf('http://localhost:3000/api/handle_redirect') !== -1) {
                  if (this.rave.paymentStatus(this.url) === 'failed') {
                    this.failedAlert();
                  } else {
                   this.successAlert();
                  }
                  browser.close();
                }
              });
        }).catch(error => {
          // Error or invalid paymentObject passed in
        });
    });
  }
  async successAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async failedAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
  }

  ngOnInit() {
    this.ravePay();
  }
}
