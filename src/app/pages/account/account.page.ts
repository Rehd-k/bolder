import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserinfoPage } from './userinfo/userinfo.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  user: any;
  userinfo: any;
  intials: string;
  settings: string;
  segmentModel = 'order';
  orders: any;
  reviews: any;
  saved: any;
  constructor(
    private authService: UserService,
    private toastCtrl: ToastController,
    private router: Router,
    private modalCtrl: ModalController
  ) { }


  async UserInfoModal() {
    const modal = await this.modalCtrl.create({
      component: UserinfoPage,
      cssClass: 'userInfo',
      componentProps: { Details: this.user, header: this.settings }
    });
    await modal.present();
  }


  segmentChanged(event: any) {
    console.log(this.segmentModel);
  }

  getprofilepic() {
    this.userinfo = this.authService.userinfo;
    console.log('decoded : ', this.userinfo.firstName);

    const fullName: string = this.userinfo.firstName;
    this.intials = fullName
      .split(' ')
      .map((name) => name[0])
      .join('')
      .toUpperCase();
  }

  ngOnInit() {
    this.getdata();
    this.getprofilepic();
  }

  getdata() {
    this.user = this.authService.getUser().subscribe((res: any) => {
      console.log(res);
      this.user = res;
      console.log(this.user);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
    const toast = this.toastCtrl.create({
      message: 'Logged out',
      duration: 3000,
    });
    // tslint:disable-next-line: no-shadowed-variable
    toast.then((toast) => toast.present());
  }
}
