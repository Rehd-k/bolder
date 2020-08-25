import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
})
export class UserinfoPage implements OnInit {

  constructor(
     private modalCtrl: ModalController,
     private formBuilder: FormBuilder,
     private authservice: UserService,
     private alrtctrl: AlertController
  ) { }
  @Input() Details: any;
  @Input() header: string;

  UpdateDetails: FormGroup;


    push() {
      if (this.Details.Notification === false) {
        this.Details.Notification = true;
      } else {
         this.Details.Notification = false;
      }
      this.update();
    }

    newsletter() {
      if (this.Details.Newsletter === false) {
        this.Details.Newsletter = true;
      } else {
         this.Details.Newsletter = false;
      }
      console.log(this.Details.Newsletter);
      this.update();
    }


  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.updateForm();
  }

  updateForm() {
    this.UpdateDetails = this.formBuilder.group({
      firstName: [this.Details.firstName, [Validators.required]],
      lastName: [this.Details.lastName, [Validators.required]],
      gender: [this.Details.Gender],
      phoneNumber: [this.Details.phoneNumber, [Validators.required]],
      email: [this.Details.email, [Validators.required, Validators.email]],
      Dob: [this.Details.Dob],
      address: [this.Details.Address, [Validators.required]],
      address_s: [this.Details.address_s],
      notify: [this.Details.Notification],
      newsletter: [this.Details.Newsletter]
    });
  }

  update() {
    const userId = this.Details._id;
    const credentials = this.UpdateDetails.value;
    console.log(userId , credentials);
    this.authservice.updateInfo(userId, credentials).subscribe(async res => {
      if (res) {
        console.log(res);
        const sucessAlert = await this.alrtctrl.create({
          header: 'Success',
          message: 'Your changes have been sucessfully updated',
          buttons: ['OK']
        });
        await sucessAlert.present();

      } else {
        const alert = await this.alrtctrl.create({
          header: 'Loging failed',
          message: res.error,
          buttons: ['OK']
        });
        await alert.present();
      }
    });

  }
}
