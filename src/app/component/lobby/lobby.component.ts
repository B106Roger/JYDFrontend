import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuardService } from './../../services/auth-guard.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})

// tslint:disable: one-line
// tslint:disable: no-string-literal

export class LobbyComponent implements OnInit, AfterViewInit {

  userAgent = window.navigator.userAgent.toLowerCase();
  isIphone = /iphone/.test( this.userAgent );
  isStandalone = 'standalone' in navigator && navigator['standalone'];
  picLang: string;
  menuSelected: string;
  menuShow = false;
  menuList = [
    {
      value: 'all',
      label: 'ALL'
    },
    {
      value: 'slots',
      label: 'SLOTS'
    },
    {
      value: 'marry',
      label: 'MARRY SLOTS'
    },
    {
      value: 'poker',
      label: 'POKER GAMES'
    }
  ];
  images = [
    {
      gameName: 'fivedragons',
      gameImgUrl: '5dragons',
      gameCategory: 'slots',
      display: '1'
    },
    {
      gameName: 'jackorbetter',
      gameImgUrl: 'jackorbetter',
      gameCategory: 'poker',
      display: '2'
    },
    {
      gameName: 'deuceswild',
      gameImgUrl: 'deuceswild',
      gameCategory: 'poker',
      display: '2'
    },
    {
      gameName: 'jokerpoker',
      gameImgUrl: 'jokerpoker',
      gameCategory: 'poker',
      display: '2'
    },
    {
      gameName: 'deuceswild',
      gameImgUrl: 'deuceswild',
      gameCategory: 'poker',
      display: '2'
    },
    {
      gameName: 'luckymario',
      gameImgUrl: 'luckygoddess',
      gameCategory: 'marry',
      display: '2'
    },
    {
      gameName: 'sambaqueen',
      gameImgUrl: 'sambaqueen',
      gameCategory: 'marry',
      display: '2'
    },
    {
      gameName: 'fivekoi',
      gameImgUrl: '5koi',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'fiftydragons',
      gameImgUrl: '50dragons',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'fortunes88',
      gameImgUrl: '88fortunes',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'diamondeternity',
      gameImgUrl: 'diamondeternity',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'huga',
      gameImgUrl: 'huga',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'beanstalk',
      gameImgUrl: 'beanstalk',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'misskitty',
      gameImgUrl: 'misskitty',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'pelicanpete',
      gameImgUrl: 'pelicanpete',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'buffalo',
      gameImgUrl: 'buffalo',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'kingofmountain',
      gameImgUrl: 'kingofmountain',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'buffalo',
      gameImgUrl: 'picBanner01@2x.png',
      gameCategory: 'slots',
      display: '3'
    },
    {
      gameName: 'buffalo',
      gameImgUrl: 'picBanner01@2x.png',
      gameCategory: 'slots',
      display: '3'
    },
    {
      gameName: 'buffalo',
      gameImgUrl: 'picBanner01@2x.png',
      gameCategory: 'slots',
      display: '3'
    },
  ];
  private scrollintervalItem;
  private touchintervalItem;

  constructor(private translate: TranslateService, private auth: AuthGuardService, private route: Router) { }

  ngOnInit() {
    // 初始化遊戲選擇項目
    if (localStorage.getItem('gameChoose') === null || localStorage.getItem('gameChoose') === undefined) {
      this.menuSelected = 'all';
      localStorage.setItem('gameChoose', 'all');
    } else {
      this.menuSelected = localStorage.getItem('gameChoose');
    }
    // 初始化遊戲圖片
    this.picLang = this.translate.currentLang;
    for (const ele of this.images) {
      switch (ele.display) {
        case '1':
          ele.gameImgUrl = `/assets/imgs/${this.picLang}/pic_game_iconL_${ele.gameImgUrl}_${this.picLang}.png`;
          break;

        case '2':
          ele.gameImgUrl = `/assets/imgs/${this.picLang}/pic_game_iconS_${ele.gameImgUrl}_${this.picLang}.png`;
          break;

        case '3':
          ele.gameImgUrl = `/assets/imgs/${this.picLang}/${ele.gameImgUrl}`;
          break;

        default:
         throw Error('Unknown Game Type');
      }
    }
    console.log(this.menuShow);
  }

  ngAfterViewInit() {
    scrollTo(0, 40);
    setTimeout(() => { $('.carousel').carousel('next'); }, 1000);
  }

  getNormalGame() {
    if (this.menuSelected === 'all') {
      return this.images.filter((e) => e.display === '2');
    } else {
      return this.images.filter((e) => e.display === '2' && e.gameCategory === this.menuSelected);
    }
  }
  getHotGame() {
    if (this.menuSelected === 'all') {
      return this.images.filter((e) => e.display === '1');
    } else {
      return this.images.filter((e) => e.display === '1' && e.gameCategory === this.menuSelected);
    }
  }
  getCarouselGame() {
    return this.images.filter((e) => e.display === '3');
  }
  getMenuSelect() {
    return this.menuList.filter((e) => e.value === this.menuSelected)[0];
  }
  setMenuSelect(e: Event) {
    if (e.type === 'touchend') {
      e.preventDefault();
    }
    let target = e.target as HTMLElement;

    if (target.nodeName === 'SPAN') {
      target = target.parentElement;
    }

    this.menuSelected = target.dataset.gametype;
    localStorage.setItem('gameChoose', this.menuSelected);
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
    console.log('close');
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
    this.auth.logout();
  }
  // 註冊滑鼠點擊拖曳 的 移動事件
  startScroll(e1: MouseEvent) {
    // 清除上一次的momentum scroll
    clearInterval(this.scrollintervalItem);
    if (this.isIphone === true) {return; }
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
  // 註冊手機點擊拖曳 的 移動事件
  startTouch(e1: TouchEvent) {
    const ele = document.querySelector('#normal-game-container') as HTMLElement;
    const initial = e1.touches[0].clientX;
    const maxscroll = ele.scrollWidth - ele.offsetWidth;
    e1.currentTarget.addEventListener('touchmove', scrollX);
    e1.currentTarget.addEventListener('touchend', endScroll);
    e1.currentTarget.addEventListener('touchcancel', endScroll);

    function scrollX(e2: TouchEvent) {
      const delta =  initial - e2.touches[0].clientX ;
      if ( delta > 0 && ele.scrollLeft === maxscroll) {
        e2.preventDefault();
      } else if (delta < 0 && ele.scrollLeft === 0){
        e2.preventDefault();
      }
    }
    function endScroll(e3: TouchEvent) {
      e3.currentTarget.removeEventListener('touchmove', scrollX);
      e3.currentTarget.removeEventListener('touchend', endScroll);
      e3.currentTarget.removeEventListener('touchcancel', endScroll);
    }
  }
}
