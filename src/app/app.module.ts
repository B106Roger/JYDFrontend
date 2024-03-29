import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.service';
import { FetchService } from './services/fetch.service';

import { LoginComponent } from './component/login/login.component';
import { HistoryComponent } from './component/history/history.component';
import { AccountComponent } from './component/account/account.component';
import { ContactComponent } from './component/contact/contact.component';
import { HeaderComponent } from './component/header/header.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { LobbyComponent } from './component/lobby/lobby.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GameRecordsComponent } from './component/history/game-records.component';
import { IoRecordsComponent } from './component/history/io-records.component';
import { GameComponent } from './component/game/game.component';
import { GamePipePipe } from './game-pipe.pipe';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HistoryComponent,
    AccountComponent,
    ContactComponent,
    HeaderComponent,
    NavBarComponent,
    LobbyComponent,
    GameRecordsComponent,
    IoRecordsComponent,
    GameComponent,
    GamePipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),

  ],
  providers: [
    AuthGuardService,
    FetchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
