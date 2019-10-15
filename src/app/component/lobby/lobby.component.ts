import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuardService } from './../../services/auth-guard.service';
import { Router } from '@angular/router';
import { GameItem } from 'src/app/iterface';
import { FetchService } from 'src/app/services/fetch.service';
declare var $: any;

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})

// tslint:disable: one-line
// tslint:disable: no-string-literal
// tslint:disable: object-literal-shorthand
export class LobbyComponent implements OnInit, AfterViewInit {
  picLang: string;
  menuSelected: any;
  menuShow = false;
  menuList = [
    {
      value: 'all',
      label: 'ALL'
    },
    {
      value: 'slot',
      label: 'SLOTS'
    },
    {
      value: 'mario',
      label: 'MARRY SLOTS'
    },
    {
      value: 'poker',
      label: 'POKER GAMES'
    }
  ];
  carasoulImages = [
    {
      gameImgUrl: `assets/imgs/${this.translate.currentLang}/picBanner01@2x.png`
    }, {
      gameImgUrl: `assets/imgs/${this.translate.currentLang}/picBanner01@2x.png`
    }, {
      gameImgUrl: `assets/imgs/${this.translate.currentLang}/picBanner01@2x.png`
    }
  ];

  images: any[] = [];

  private scrollintervalItem;
  constructor(private translate: TranslateService, private auth: AuthGuardService, private route: Router, private fetch: FetchService) { }

  ngOnInit() {
    // 初始化遊戲選擇項目
    this.menuSelected = this.menuList[0];
    // 初始化遊戲列表
    this.picLang = this.translate.currentLang;
    const localGameList = localStorage.getItem('gameList');
    let gameListArray: GameItem[] = [];
    if (localGameList !== null && localGameList !== '') {
      gameListArray = JSON.parse(localGameList);
      // 處理gameList，變成圖片位置
      this.processedGameList(gameListArray);
    } else {
      this.fetch.fetchGameList().then((gameList: GameItem[]) => {
        // 處理gameList，變成圖片位置
        console.log('late');
        this.processedGameList(gameList);
      });
    }


  }

  ngAfterViewInit() {
    setTimeout(() => { $('.carousel').carousel('next'); }, 1000);
  }

  getMenuSelect() {
    return this.menuSelected;
  }
  setMenuSelect(e: Event) {
    if (e.type === 'touchend') {
      e.preventDefault();
    }
    let target = e.target as HTMLElement;

    if (target.nodeName === 'SPAN') {
      target = target.parentElement;
    }

    this.menuSelected = this.menuList.filter(item => item.value === target.dataset.gametype)[0];
    this.menuShow = false;
  }
  toggleMenuOnShow(e: Event) {
    if (e.type === 'touchend') {
      e.preventDefault();
    }
    if (this.menuShow) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  closeMenu() {
    this.menuShow = false;
  }
  openMenu() {
    this.menuShow = true;
  }


  setYesNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('lobby.yesImgNormal'));
  }

  setNoNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('lobby.noImgNormal'));
  }

  setYesPressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('lobby.yesImgPressed'));
  }

  setNoPressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('lobby.noImgPressed'));
  }

  setCloseNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , '/assets/imgs/btnLogoutLeaveNormal.png');
  }

  setClosePressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , '/assets/imgs/btnLogoutLeavePressed.png');
  }

  closeLogoutBox() {
    document.getElementById('logout-box').hidden = true;
  }

  logout() {
    const remember = localStorage.getItem('remember') === 'true' ? true : false;
    this.auth.logout(remember);
  }
  // 註冊滑鼠點擊拖曳 的 移動事件
  startScroll(e1: MouseEvent) {
    // 清除上一次的momentum scroll
    clearInterval(this.scrollintervalItem);
    if (window['isIphone'] === true) {return; }
    const initialLocation = e1.clientX;
    const initalTime = new Date();
    let previousLocation = initialLocation;

    const newendScroll = endScroll.bind(this);
    const ele = document.querySelector('#normal-game-container') as HTMLElement;
    e1.currentTarget.addEventListener('mousemove', scrollX);
    e1.currentTarget.addEventListener('mouseup', newendScroll);
    e1.currentTarget.addEventListener('mouseleave', newendScroll);

    function scrollX(e2: MouseEvent) {
      const delta =  previousLocation - e2.clientX ;
      ele.scrollLeft += delta;
      previousLocation = e2.clientX;
    }
    function endScroll(e3: MouseEvent) {
      e3.currentTarget.removeEventListener('mousemove', scrollX);
      e3.currentTarget.removeEventListener('mouseup', newendScroll);
      e3.currentTarget.removeEventListener('mouseleave', newendScroll);

      // *************   Momentum Scroll   ****************
      const interval = new Date().getTime() - initalTime.getTime();
      const distance = initialLocation - e3.clientX;

      let velocity = distance / interval;
      if (interval === 0) {
        velocity = distance / 0.1;
      }

      const maxscroll = ele.scrollWidth - ele.offsetWidth;
      const updateInterval = 10;
      let updateconstant = 5;
      const decreaseRatio = 0.1;
      const initalcount = 1000;
      let count = initalcount;
      if (Math.abs(velocity) > 0.05) {
        this.scrollintervalItem = setInterval(() => {
          let displacement = Math.floor(velocity  * updateInterval);
          const absVelocity = Math.abs(velocity);
          if (velocity < 0) {displacement += 1; }

          if (absVelocity < 0.2) { updateconstant = 50; }
          else if (absVelocity < 0.3) { updateconstant = 25; }
          else if (absVelocity < 0.4) { updateconstant = 15; }
          else if (absVelocity < 0.5) { updateconstant = 11; }
          else if (absVelocity < 0.7) { updateconstant = 9; }
          else if (absVelocity < 1) { updateconstant = 7; }
          // 如果滑動速率低於0.1 px/ms 或 滑到頂部或底部，就停下來，並清除momentum scroll
          if (Math.abs(velocity) > 0.15 && ele.scrollLeft !== 0 && ele.scrollLeft !== maxscroll) {
            if (count > 0) {
              ele.scrollLeft += displacement;
              count -= updateInterval * updateconstant;
            } else {
              count = initalcount;
              velocity = velocity * (1 - decreaseRatio);
            }
          } else {
            clearInterval(this.scrollintervalItem);
          }
        }, updateInterval);
      }
      // *******************************************
    }
  }
  private processedGameList(gameListArray: GameItem[]) {
    console.log(gameListArray);
    this.images = [];
    gameListArray.forEach((gameItem: GameItem, index: number) => {
      let gameImgUrl: string;
      // 設定圖片路徑
      if (index === 0) {
        gameImgUrl = `/assets/imgs/${this.picLang}/pic_game_iconL_${gameItem.DisplayName}_${this.picLang}.png`;
      } else {
        gameImgUrl = `/assets/imgs/${this.picLang}/pic_game_iconS_${gameItem.DisplayName}_${this.picLang}.png`;
      }
      this.images.push({
        DisplayName: gameItem.DisplayName,
        GameType: gameItem.GameType,
        gameImgUrl: gameImgUrl,
      });
    });
  }
}
