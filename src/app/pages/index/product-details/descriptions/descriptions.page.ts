import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-descriptions',
  templateUrl: './descriptions.page.html',
  styleUrls: ['./descriptions.page.scss'],
})
export class DescriptionsPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  @Input() Description: any;



  ngOnInit() {
   console.log(this.Description);
  }
 dismiss() {
   this.modalCtrl.dismiss();
 }
}
