import { Component, OnInit , AfterViewChecked ,ViewChild, ElementRef} from '@angular/core';
import { ChatService } from '../service/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})



export class ChatComponent implements OnInit {

	@ViewChild('scrollMe') private scrollContainer: ElementRef;

	connection;
	message: string;
	chats : any;
	initial_message:any;
	constructor(private chatService: ChatService) { }

	scrollToBottom(): void {
	    try {
	  	    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
	    } catch(err) { }
	}

	ngOnInit() {
		this.chats = []
		if(localStorage.getItem("message_from") != null){
			this.chats.push({ from: 'me', message: localStorage.getItem("message_from")})
			this.scrollToBottom()
		}
		if(localStorage.getItem("message_to") != null){
			this.chats.push({ from: 'watson', message: localStorage.getItem('message_to') })
			this.scrollToBottom()	
		}
	  	this.connection = this.chatService.getMessage().subscribe(data => {
	  		console.log(data)
			this.chats.push({ from: 'watson', message: data['output']['text'][0] })
			this.scrollToBottom()
		})
	}
	ngAfterViewChecked(){
		this.scrollToBottom();
	}

	sendMessage(){
		this.chats.push({ from: 'me', message: this.message })
		this.chatService.sendMessage(this.message, "message")
		this.message = '';
	}
	

}
