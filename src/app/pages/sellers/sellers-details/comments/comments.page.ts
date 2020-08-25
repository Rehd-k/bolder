import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  @Input() comments: any;
  @ViewChild(IonContent, { static: true }) content: IonContent;

  messages = [];
  innaSegment = 'Comments';
  currentUser: any;
  msg = '';
  clickedStory = null;

  constructor() {}


  sendMessage() {
    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }


  ngOnInit() {

  }


}
