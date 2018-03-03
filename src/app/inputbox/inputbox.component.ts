import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-inputbox',
  templateUrl: './inputbox.component.html',
  styleUrls: ['./inputbox.component.css']
})
export class InputboxComponent implements OnInit {
	model: any;
	searching = false;
	searchFailed = false;
	hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
 	inputboxSubscription: Subscription;

 	constructor(private searchService: SearchService) { }

	ngOnInit() {
		this.inputboxSubscription = this.searchService.getClear().subscribe(() => {
			this.model = "";
		})	
	}

    search = (text$: Observable<string>) =>
	    text$
	      .debounceTime(300)
	      .distinctUntilChanged()
	      .do(() => this.searching = true)
	      .switchMap(msg =>
		        this.searchService.sendSearchKey(msg)
		          .do(() => this.searchFailed = false)
		          .catch(() => {
		            this.searchFailed = true;
		            return of([]);
		          }))
	      .do(() => this.searching = false)
	      .merge(this.hideSearchingWhenUnsubscribed);

  	formatter = (x: {text: string}) => x.text;

   	getDetail(model) {
	   	let item = model.item.magicKey
	   	this.searchService.sendmagicKey(item)
   	}


}
