import { Component, OnInit } from '@angular/core';
import { SellersService } from 'src/app/services/sellers.service';
import { Sellers } from './sellers.model';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.page.html',
  styleUrls: ['./sellers.page.scss'],
})
export class SellersPage implements OnInit {

  public sellers: Sellers[] = [];
  public searchControl: FormControl;
  public filterControl: FormControl;
  public filter = '';
  public searching: any = false;

  constructor(private sellerService: SellersService) {
    this.searchControl = new FormControl();
    this.filterControl = new FormControl();
  }

  ionViewDidEnter() {
    this.searchControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(search => {
        this.searching = false;
        if (search !== '') {
          this.getSearchResult(search);
        }
      });

    this.filterControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(filterText => {
        this.filter = filterText;
        this.searching = false;
        this.getFilterResult(filterText);
      });

  }


  onSearchInput() {
    this.searching = true;
  }

  loadmore() {
    this.sellerService.getSellers()
      .subscribe(res => {
        console.log(res);
        this.sellers = this.sellers.concat(res);
        console.log(this.sellers);
      });
  }
  async getSearchResult(search: string) {

    const filter = this.filter;
    this.sellerService.getSearchResult(filter, search)
      .subscribe(res => {
        console.log(res);
        this.sellers = res;
        console.log(this.sellers);
      });
  }

  async getFilterResult(filterText: string) {
    this.sellerService.getFilter(filterText)
      .subscribe(res => {
        console.log(res);
        this.sellers = res;
        console.log(this.sellers);
      });
  }




  async getsellers() {
    this.sellerService.getSellers()
      .subscribe(res => {
        this.sellers = res;
      });
  }

  ngOnInit() {
    this.getsellers();

  }

}
