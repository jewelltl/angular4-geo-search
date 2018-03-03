import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnlineComponent implements OnInit {
	website: string;
	connection;
  	constructor(
  		private chatService: ChatService,	
  		private router: Router,
	) { }

	ngOnInit() {
		this.connection = this.chatService.getMessage().subscribe(data => {
			console.log(data)
			localStorage.setItem("message_to", JSON.stringify(data['output']['text'][0]));
			this.router.navigate(['/chat'])
		})
	}
 	submit(){
 		this.chatService.sendMessage(this.website, 'ecommerce');
 		localStorage.setItem("message_from", this.website);
  	}

}
