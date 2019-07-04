import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPopperModule } from 'ngx-popper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './component/login/login.component';
import { HistoryComponent } from './component/history/history.component';
import { AccountComponent } from './component/account/account.component';
import { ContactComponent } from './component/contact/contact.component';
import { DownloadAppComponent } from './component/download-app/download-app.component';
import { HeaderComponent } from './component/header/header.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { LobbyComponent } from './component/lobby/lobby.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HistoryComponent,
    AccountComponent,
    ContactComponent,
    DownloadAppComponent,
    HeaderComponent,
    NavBarComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    NgxPopperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
