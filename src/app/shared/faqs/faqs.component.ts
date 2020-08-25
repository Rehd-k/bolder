import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('questions') questions: any;

  constructor() { }

  ngOnInit() {}

}
