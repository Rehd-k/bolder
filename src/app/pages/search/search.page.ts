import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { ModalController } from '@ionic/angular';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { GenericService } from 'src/app/services/generic.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  loadedProducts: any;
  searching = false;
  searchText: any;
  searchResults = [];
  searchControl: FormControl;

  constructor(
    private search: GenericService,
    private modalController: ModalController,
  ) {
    this.searchControl = new FormControl();
   }

  @ViewChild('searchBar',  {read: ElementRef , static: true} )searchBar: ElementRef;

  onSearchInput() {
    this.searching = true;
  }

  dosearch() {
    const skip = this.searchResults.length;
    this.searchControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(search => {
        this.searchText = search;
        this.searching = false;
        if (search !== '') {
          this.getSearch(search, skip);
        }
      });
  }

  loadData(event?: { target: any; }) {
    this.getMoreResults(event);
    if (this.searchResults.length === 10) {
      event.target.disabled = true;
    }

  }

  getSearch(search: any, skip: number) {
    this.search.doSearch(search, skip)
      .subscribe(res => {
        console.log(res);
        this.searchResults = res;
      });

  }

  getMoreResults(event?: { target: { complete: () => void; }; }) {
    const skip = this.searchResults.length;
    this.search.doSearch(this.searchText, skip)
      .subscribe(res => {
        console.log(res);
        this.searchResults = this.searchResults.concat(res);

        if (event) {
          event.target.complete();
        }
      });
  }

  dismiss() {
    this.modalController.dismiss();

  }

  ngOnInit() {
    this.dosearch();
  }
}
