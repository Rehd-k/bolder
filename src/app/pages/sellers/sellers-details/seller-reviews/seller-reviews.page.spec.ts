import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SellerReviewsPage } from './seller-reviews.page';

describe('SellerReviewsPage', () => {
  let component: SellerReviewsPage;
  let fixture: ComponentFixture<SellerReviewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerReviewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SellerReviewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
