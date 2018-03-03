import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import {HttpClient, HttpParams} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchService {
	private inputboxSubject = new Subject<any>();
	private mapdataSubject = new Subject<any>();

	constructor(private http: HttpClient) { }

  	sendSearchKey(msg: string){
		if(msg == ''){
			return of([]);
		}else{
			return this.http.post("/api/list", { keyword: msg })
				.map((response) => response)
		}
	}
	sendmagicKey(magicKey: string){

		if(magicKey == ''){
			return of([]);
		}else{
			return this.http.post("/api/detail", { magicKey: magicKey })
				.map((response) => response)
				.subscribe((data) => this.mapdataSubject.next(data))
		}
	}
	getDetail(){
		return this.mapdataSubject.asObservable();
	}
	
	setClear(){
		this.inputboxSubject.next();
	}

	getClear(){
		return this.inputboxSubject.asObservable();
	}
	
}
