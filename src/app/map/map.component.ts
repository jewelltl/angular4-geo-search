import { Component, OnInit } from '@angular/core';
import { SearchService } from '../service/search.service';
import { ChatService } from '../service/chat.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  	connection;
	mapdataSubscription: Subscription;
	address;
	long_label;

	constructor(
		private searchService: SearchService,
		private chatService: ChatService,
		private route: ActivatedRoute,
		private router: Router,
	) { }
	result = {
	  	x: 0 ,
	  	y: 0
	};
  	
	visible = false;

	ngOnInit() {
		this.mapdataSubscription = this.searchService.getDetail().subscribe((data) => {
			this.result = data.location
			this.long_label = data.attributes.LongLabel
	      	this.address = data.attributes.PlaceName + " - " + data.attributes.StAddr + " - " + data.attributes.City + " - " + data.attributes.Region + " - " + data.attributes.Postal
			this.visible = true;
		})
		this.connection = this.chatService.getMessage().subscribe(data => {
			localStorage.setItem("message_to", JSON.stringify(data['output']['text'][0]));
			localStorage.setItem("message_from", this.long_label);
			this.router.navigate(['/chat'])
		})
		
	}

  clear(){
    this.visible = false;
    this.searchService.setClear()
  }
  toWatson(){
  	this.chatService.sendMessage(this.address, "address")
  }

}
