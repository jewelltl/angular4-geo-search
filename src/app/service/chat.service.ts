import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import {HttpClient, HttpParams} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {

  	constructor(private http: Http) { }
 	// private url = location.hostname + ":" + location.port ;
	private url = location.hostname ;

	private socket;

  	sendMessage(msg: string, type: string){
		if(msg == ''){
			return of([]);
		}else{
			this.socket.emit('pe_app:to_watson', {message: msg, type: type});
		}
	}
	getMessage(){
		let observable = new Observable<any>(observer => {
			this.socket = io(this.url);
			this.socket.on('pe_app:from_watson', (data)=> {
				observer.next(data.message);
			})
			return () => {
				this.socket.disconnect();
			}
		})
		return observable;
	}

}


