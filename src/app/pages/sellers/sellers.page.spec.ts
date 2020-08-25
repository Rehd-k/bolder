import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SellersPage } from './sellers.page';

describe('SellersPage', () => {
  let component: SellersPage;
  let fixture: ComponentFixture<SellersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SellersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
