import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';


import { AppComponent } from './app.component';
import { InputboxComponent } from './inputbox/inputbox.component';
import { MapComponent } from './map/map.component';
import { OnlineComponent } from './online/online.component';
import { OfflineComponent } from './offline/offline.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChatComponent } from './chat/chat.component';

import { SearchService } from './service/search.service';
import { ChatService } from './service/chat.service';

import { AppRoutingModule } from './app-routing.module';




@NgModule({
  declarations: [
    AppComponent,
    InputboxComponent,
    MapComponent,
    OnlineComponent,
    OfflineComponent,
    WelcomeComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxMapboxGLModule.forRoot({
      accessToken: 'pk.eyJ1IjoibGVldGFpbG9vbmciLCJhIjoiY2pkaXMwZDk1MWVwOTJxcGd2ZDZzNWtvMyJ9.JZpU9wO9_8D2L9n5TZ6ZSA'
    }),
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    SearchService,
    ChatService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
