import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuardService } from './../../services/auth-guard.service';
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
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGame5Dragons.png',
      gameCategory: 'slots',
      display: '1'
    },
    {
      gameName: 'deuceswild',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_deuceswild_en.png',
      gameCategory: 'poker',
      display: '2'
    },
    {
      gameName: 'deuceswild',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_deuceswild_en.png',
      gameCategory: 'poker',
      display: '2'
    },
    {
      gameName: 'deuceswild',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_deuceswild_en.png',
      gameCategory: 'poker',
      display: '2'
    },
    {
      gameName: 'deuceswild',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_deuceswild_en.png',
      gameCategory: 'poker',
      display: '2'
    },
    {
      gameName: 'luckygoddess',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_luckygoddess_en.png',
      gameCategory: 'marry',
      display: '2'
    },
    {
      gameName: 'sambaqueen',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_sambaqueen_en.png',
      gameCategory: 'marry',
      display: '2'
    },
    {
      gameName: 'fivekoi',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGame5Koi.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'fiftydragons',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGame50Dragons.png',
      gameCategory: 'slots',
      display: '2'
    },
    // {
    //   gameName: 'gameagent008',
    //   gameScript: 'url_string',
    //   gameImgUrl: '/assets/imgs/picGameAgent008.png',
    //   gameCategory: 'slots',
    //   display: '2'
    // },
    {
      gameName: 'fortunes88',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGame88Fortunes.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'diamondeternity',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_diamondeternity_en.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'huga',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_huga_en.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'beanstalk',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGameBeanstalk.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'misskitty',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_misskitty_en.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'pelicanpete',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_pelicanpete_en.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'buffalo',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGameBuffalo.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'kingofmountain',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_kingofmountain_en.png',
      gameCategory: 'slots',
      display: '2'
    },
    // {
    //   gameName: 'sexybartender',
    //   gameScript: 'url_string',
    //   gameImgUrl: '/assets/imgs/pic_game_iconS_sexybartender_en.png',
    //   gameCategory: 'slots',
    //   display: '2'
    // },
    // {
    //   gameName: 'soccerfever',
    //   gameScript: 'url_string',
    //   gameImgUrl: '/assets/imgs/pic_game_iconS_soccerfever_en.png',
    //   gameCategory: 'slots',
    //   display: '2'
    // },
    {
      gameName: 'buffalo',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picBanner01.png',
      gameCategory: 'slots',
      display: '3'
    },
    {
      gameName: 'buffalo',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picBanner01.png',
      gameCategory: 'slots',
      display: '3'
    },
    {
      gameName: 'buffalo',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picBanner01.png',
      gameCategory: 'slots',
      display: '3'
    },
  ];
  private scrollintervalItem;
  private touchintervalItem;

  constructor(private translate: TranslateService, private auth: AuthGuardService) { }

  ngOnInit() {
    // 初始化遊戲選擇項目
    if (!localStorage.getItem('gameChoose')) {
      this.menuSelected = 'all';
      localStorage.setItem('gameChoose', 'all');
    } else {
      this.menuSelected = localStorage.getItem('gameChoose');
    }
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
  setMenuSelect(menuOption: string) {
    this.menuSelected = menuOption;
    localStorage.setItem('gameChoose', menuOption);
  }
  toggleMenuOnShow() {
    this.menuShow = !this.menuShow;
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
      console.log('ini location: ', initialLocation, 'final location: ' , e3.clientX);
      console.log('interval: ', interval, ' diff: ', distance, 'velocity: ', velocity);

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
              console.log(velocity, displacement, updateconstant);
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
    // 這個手機事件只有iphone 的 standalone模式才需要註冊
    if (! (this.isIphone &&  this.isStandalone)) { return; }

    // 清除上一次的momentum scroll
    clearInterval(this.touchintervalItem);
    const initialLocation = e1.changedTouches[0].clientX;
    const initalTime = new Date();
    let previousLocation = initialLocation;

    const newendScroll = endScroll.bind(this);
    const ele = document.querySelector('#normal-game-container') as HTMLElement;
    e1.currentTarget.addEventListener('touchmove', scrollX);
    e1.currentTarget.addEventListener('touchend', newendScroll);
    e1.currentTarget.addEventListener('touchcancel', newendScroll);

    function scrollX(e2: TouchEvent) {
      const delta =  previousLocation - e2.changedTouches[0].clientX ;
      ele.scrollLeft += delta;
      previousLocation = e2.changedTouches[0].clientX;
    }
    function endScroll(e3: TouchEvent) {
      e3.currentTarget.removeEventListener('touchmove', scrollX);
      e3.currentTarget.removeEventListener('touchend', newendScroll);
      e3.currentTarget.removeEventListener('touchcancel', newendScroll);

      // *************   Momentum Scroll   ****************
      const interval = new Date().getTime() - initalTime.getTime();
      const distance = initialLocation - e3.changedTouches[0].clientX;

      let velocity = distance / interval;
      if (interval === 0) {
        velocity = distance / 0.1;
      }
      console.log('ini location: ', initialLocation, 'final location: ' , e3.changedTouches[0].clientX);
      console.log('interval: ', interval, ' diff: ', distance, 'velocity: ', velocity);

      const maxscroll = ele.scrollWidth - ele.offsetWidth;
      const updateInterval = 10;
      let updateconstant = 5;
      const decreaseRatio = 0.1;
      const initalcount = 1000;
      let count = initalcount;
      if (Math.abs(velocity) > 0.05) {
        this.touchintervalItem = setInterval((e) => {
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
          if (absVelocity > 0.15 && ele.scrollLeft !== 0 && ele.scrollLeft !== maxscroll) {
            if (count > 0) {
              ele.scrollLeft += displacement;
              count -= updateInterval * updateconstant;
            } else {
              count = initalcount;
              velocity = velocity * (1 - decreaseRatio);
            }
          } else {
            clearInterval(this.touchintervalItem);
          }
        }, updateInterval);
      }
      // *******************************************
    }
  }
}
