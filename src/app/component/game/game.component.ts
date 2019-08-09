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

  ngOnInit() {
    console.log( this.routerInfo.snapshot.params.gameName );
    window['_GameName'] = this.routerInfo.snapshot.params.gameName;
    window['_GameUrl']  = 'https://dev-slot-mario.gd888.cc/gamelab/';
    window['_Bearer']   = this.auth.getUserID();
  }

  ngAfterViewInit(): void {
  }

  getSrc() {
    if (this.isIphone) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('/assets/Games/ios-embed.html');
    } else if (screen.width > 500) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('/assets/Games/desktop.html');
    } else {
      return this.sanitizer.bypassSecurityTrustResourceUrl('/assets/Games/embed.html');
    }
  }

  ngOnDestroy() {
    delete window['_GameName'];
    delete window['_GameUrl'];
    delete window['_Bearer'];
  }

}
