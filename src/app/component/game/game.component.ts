import { Component, OnInit , OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardService } from './../../services/auth-guard.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FetchService } from 'src/app/services/fetch.service';
// tslint:disable: max-line-length
// tslint:disable: no-string-literal

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit , OnDestroy, AfterViewInit {
  @ViewChild('myiframe',{static: false}) myframe: ElementRef;

  constructor(private routerInfo: ActivatedRoute, private auth: AuthGuardService,
              public sanitizer: DomSanitizer, public fetch: FetchService, public route: Router) { }

  isIphone = window['isIphone'];
  gameType = '';
  gameName = this.routerInfo.snapshot.params.gameName;
  orientation = '';
  historyBack = history.back;
  iframeURL;

  ngOnInit() {
    console.log( this.routerInfo.snapshot.params.gameName );
    this.gameType = this.routerInfo.snapshot.params.gameType;

    window['_GameName'] = this.gameName;
    if (this.gameName === 'jokerpk') {
      window['_GameName'] = 'tenpk';
    }
    window['_GameUrl'] = this.getGameUrl();
    window['_Bearer']   = this.auth.getUserID();
    this.iframeURL = this.getSrc();
    this.getOrientation();


    // 將history.back方法改寫
    // window['_backCallback']  = (e: any) => {
    //   console.log('current location: ', window.location.origin);
    //   console.log('receive location: ', e.origin);
    //   if (e.data.command === 'back' && e.origin === window.location.origin) {
    //     window.removeEventListener('message', window['_backCallback'], false);
    //     console.log('back to lobby');
    //     setTimeout(() => {
    //       this.route.navigate(['/lobby']);
    //     }, 0);
    //   }
    // };
    // window['_backCallback'] = window['_backCallback'].bind(this);
    // window.addEventListener('message', window['_backCallback'], false);
  }

  ngAfterViewInit(): void {
    const iframe = document.querySelector('iframe');
  }

  getSrc() {
    switch ( this.gameType ) {
      case 'slots':
        return this.sanitizer.bypassSecurityTrustResourceUrl('/assets/Games/slots.html');

      case 'marry':
        return this.sanitizer.bypassSecurityTrustResourceUrl(`/assets/Games/${this.gameName}/Builds/index.html`);

      case 'poker':
        return this.sanitizer.bypassSecurityTrustResourceUrl(`/assets/Games/${this.gameName}/poker.html`);

        default:
        throw Error('Unknown Game Type');
    }
  }

  getOrientation() {
    switch ( this.gameType ) {
      case 'slots':
        this.orientation = 'landscape';
        break;

      case 'marry':
        this.orientation = 'portrait';
        break;

      case 'poker':
        this.orientation = 'portrait';
        break;

      default:
        throw Error('Unknown Game Type');
    }
  }

  getGameUrl() {
    switch (this.gameType) {
      case 'slots': {
        return 'https://dev-slot-mario.gd888.cc/gamelab/';
      }
      case 'marry': {
        return 'https://dev-slot-mario.gd888.cc/gamelab/';
      }
      case 'poker': {
        return 'https://5pk.bet7evens.com';
      }
      default: {
        throw Error('Unknown Game Type');
      }
    }
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }

  addListenerInIframe() {
    const iframe = document.querySelector('iframe');
    const game = iframe.contentWindow.document.querySelector('body');
    game.addEventListener('mousedown', (e) => {e.stopPropagation(); }, true);

    // const currentlocation = window.location.origin;
    // const script = document.createElement('script');
    // script.innerHTML = 'history.back = function(){  parent.window.postMessage({"command":"back"}, \'' + currentlocation + '\');  };';
    // iframe.contentWindow.document.body.appendChild(script);
  }

  ngOnDestroy() {
    delete window['_GameName'];
    delete window['_GameUrl'];
    delete window['_Bearer'];
    // delete window['_backCallback'];
    this.fetch.fetchAmount();
  }
}
