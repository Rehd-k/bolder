import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Storage } from '@ionic/storage';
import { ToastController, ModalController } from '@ionic/angular';
import { LivechatPage } from './livechat/livechat.page';


@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})

export class SupportPage implements OnInit {
  loggin = true;
  online = false;
  userinfo: any;
  user: any;
  emailInput: any;
  clickedHelp: any;


  constructor(private authService: UserService,
              private toastCtrl: ToastController,
              private modalController: ModalController,
              private st: Storage
  ) {
  }




  isLoggedin() {
    this.userinfo = this.authService.userinfo;
    console.log(this.userinfo);
    if (this.userinfo === undefined) {
      this.loggin = false;
      this.user = this.emailInput;
    } else {
      this.loggin = true;
      this.user = this.userinfo;
    }
  }

  async sendMessage() {
    const modal = await this.modalController.create({
      component: LivechatPage,
      componentProps: {
        sender: this.user,
        helpType: 'chat'
      }
    });
    await modal.present();
  }

  async Getfaqs() {
    const modal = await this.modalController.create({
      component: LivechatPage,
      componentProps: {
        sender: this.user,
        helpType: 'F.A.Q s'
      }
    });
    await modal.present();
  }

  async Getterms() {
    const modal = await this.modalController.create({
      component: LivechatPage,
      componentProps: {
        sender: this.user,
        helpType: 'Terms and Conditions'
      }
    });
    await modal.present();
  }

  ngOnInit() {
     this.isLoggedin();

  }
}
