import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { OnlineComponent } from './online/online.component';
import { OfflineComponent } from './offline/offline.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
	{ path: '', redirectTo: '/index', pathMatch: 'full'},
	{ path: 'index', component: WelcomeComponent},
	{ path: 'online.biz', component: OnlineComponent},
	{ path: 'offline.biz', component: OfflineComponent},
	{ path: 'chat', component: ChatComponent},
];

@NgModule({
	imports : [RouterModule.forRoot(routes)],
	exports: [RouterModule]  
})
export class AppRoutingModule { }
