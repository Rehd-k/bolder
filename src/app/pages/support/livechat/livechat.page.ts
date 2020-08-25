import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, ToastController, IonContent } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.page.html',
  styleUrls: ['./livechat.page.scss'],
})
export class LivechatPage implements OnInit {
  @Input() sender: any;
  @Input() helpType: any;

  information: any[];
  automaticClose = true;
  users: any = [];

  msg = '';
  messages: any = [];
  currentUser: any;

  @ViewChild(IonContent, { static: true }) content: IonContent;

  constructor(private modalController: ModalController,
              private http: HttpClient,
              private socket: Socket) { }


  toggleSection(index: number) {
    this.information[index].open = !this.information[index].open;
    if (this.automaticClose && this.information[index].open) {
      this.information
        .filter((item, itemIndex) => itemIndex !== index)
        .map(item => item.open = false);
    }
  }
  toggleItem(index: string | number, childindex: string | number) {
    this.information[index].Children[childindex].open = !this.information[index].Children[childindex].open;
  }

  dismis() {
    this.modalController.dismiss();

  }


  ionViewWillLeave() {
    this.socket.disconnect();
  }

  sendMessage() {
    this.socket.emit('send-message', this.msg, this.sender.email);
    this.msg = '';
    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }
  livechatConnect() {
    // Socket connection
    this.socket.connect();
    this.currentUser = this.sender.firstName;
    const room = this.sender._id;

    // User joined
    this.socket.emit('set-user', room, this.currentUser);
    console.log(room, this.currentUser);

    // Get room and users
    this.socket.fromEvent('roomUser').subscribe(data => {
      console.log(data);
      this.users.push(data);
    });

    // Broadcast user joined message
    this.socket.fromEvent('users-changed').subscribe(data => {
      console.log(data);
      this.messages.push(data);
    });

    // Chat messages
    this.socket.fromEvent('chat-message').subscribe(message => {
      console.log(message);
      this.messages.push(message);
    });
  }

  callHelp() {


    // if (this.helpType === 'chat') {

    //   console.log("hi")
    //   // this.livechatConnect();
    // }
    // else if (this.helpType === 'Terms and Conditions') {
    //   console.log(this.helpType);
    // } else if (this.helpType === 'F.A.Q s') {

    //   this.http.get('assets/information.json').subscribe(
    //     res => {
    //       const items = 'Faqs';
    //       this.information = res[items];
    //       console.log('information: ', res[items]);
    //     }
    //   );



    // }
    // else {

    // }

  }

  ngOnInit() {
    this.callHelp();

  }

}
