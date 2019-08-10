import { Component, OnInit , OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthGuardService } from './../../services/auth-guard.service';
// tslint:disable: no-string-literal
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit , OnDestroy, AfterViewInit {
  @ViewChild('myiframe',{static: false}) myframe: ElementRef;
  constructor(private routerInfo: ActivatedRoute, private auth: AuthGuardService, public sanitizer: DomSanitizer) { }

  userAgent = window.navigator.userAgent.toLowerCase();
  isIphone = /iphone/.test( this.userAgent );
  gameType = '';
  orientation = '';
  iframeURL;
  ngOnInit() {
    console.log( this.routerInfo.snapshot.params.gameName );
    window['_GameName'] = this.routerInfo.snapshot.params.gameName;
    window['_GameUrl']  = 'https://dev-slot-mario.gd888.cc/gamelab/';
    window['_Bearer']   = this.auth.getUserID();
    this.gameType = this.routerInfo.snapshot.params.gameType;
    this.iframeURL = this.getSrc();
    this.initOrientation();
  }

  ngAfterViewInit(): void {
  }

  getSrc() {
    switch ( this.gameType ) {
      case 'slots':
        console.log('--------------------slot game');
        return this.sanitizer.bypassSecurityTrustResourceUrl('/assets/Games/slots.html');

      case 'marry':
        console.log('--------------------marry slot game');
        return this.sanitizer.bypassSecurityTrustResourceUrl(`/assets/Games/${window['_GameName']}/index.html`);

      case 'poker':
        console.log('--------------------poker game');
        return this.sanitizer.bypassSecurityTrustResourceUrl('/assets/Games/poker.html');

      default:
        throw Error('Unknown Game Type');
    }
  }

  initOrientation() {
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

  ngOnDestroy() {
    delete window['_GameName'];
    delete window['_GameUrl'];
    delete window['_Bearer'];
  }

}
