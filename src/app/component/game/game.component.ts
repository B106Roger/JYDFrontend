import { Component, OnInit , OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardService } from './../../services/auth-guard.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FetchService } from 'src/app/services/fetch.service';
import { GameItem } from 'src/app/iterface';
// tslint:disable: max-line-length
// tslint:disable: no-string-literal

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit , OnDestroy {

  constructor(private routerInfo: ActivatedRoute, private auth: AuthGuardService,
              public sanitizer: DomSanitizer, public fetch: FetchService, public route: Router) { }
  isIphone = window['isIphone'];
  gameItem: GameItem;
  gameName: string = this.routerInfo.snapshot.params.gameName;
  iframeURL;

  ngOnInit() {
    if (localStorage.getItem('gameList') !== null) {
      this.gameItem = JSON.parse(localStorage.getItem('gameList')).filter( (item: GameItem) => item.DisplayName === this.gameName )[0];
    } else {
      console.log(this.gameName);
      alert('unknown game name');
      this.route.navigate(['lobby']);
    }
    window['_DisplayName'] = this.gameItem.DisplayName;
    window['_GameName'] = this.gameItem.GameName;
    window['_GameUrl'] = this.gameItem.URL;
    window['_Bearer']   = this.auth.getUserID();
    this.iframeURL = this.getSrc();
  }

  getSrc() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`/assets/Games/${this.gameName}/index.html`);
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }

  addListenerInIframe() {
    const iframe = document.querySelector('iframe');
    const game = iframe.contentWindow.document.querySelector('body');
    game.addEventListener('mousedown', (e) => {e.stopPropagation(); }, true);
  }

  ngOnDestroy() {
    delete window['_GameName'];
    delete window['_GameUrl'];
    delete window['_Bearer'];
    delete window['_DisplayName'];
    this.fetch.fetchAmount();
  }

  log(a) {
    console.log(a);
    console.log('asdfadfa');
  }
}
