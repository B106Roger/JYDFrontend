import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuardService } from './../../services/auth-guard.service';
declare var $: any;

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})

export class LobbyComponent implements OnInit, AfterViewInit {

  menuSelected = 'all';
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
    {
      gameName: 'sexybartender',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_sexybartender_en.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'soccerfever',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_soccerfever_en.png',
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
    {
      gameName: 'sexybartender',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_sexybartender_en.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'soccerfever',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_soccerfever_en.png',
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
    {
      gameName: 'sexybartender',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_sexybartender_en.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'soccerfever',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_soccerfever_en.png',
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
    {
      gameName: 'sexybartender',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_sexybartender_en.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'soccerfever',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_soccerfever_en.png',
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
    {
      gameName: 'sexybartender',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_sexybartender_en.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'soccerfever',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_soccerfever_en.png',
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
    {
      gameName: 'sexybartender',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_sexybartender_en.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'soccerfever',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/pic_game_iconS_soccerfever_en.png',
      gameCategory: 'slots',
      display: '2'
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
    var scrollintervalItem;
    clearInterval(scrollintervalItem);
    const initialLocation = e1.clientX;
    const initalTime = new Date();
    let previousLocation = initialLocation;

    const ele = document.querySelector('#normal-game-container');
    e1.currentTarget.addEventListener('mousemove', scrollX);
    e1.currentTarget.addEventListener('mouseup', endScroll);
    e1.currentTarget.addEventListener('mouseleave', endScroll);

    function scrollX(e2: MouseEvent) {
      const delta =  previousLocation - e2.clientX ;
      ele.scrollLeft += delta;
      previousLocation = e2.clientX;
    }
    function endScroll(e3: MouseEvent) {
      e3.currentTarget.removeEventListener('mousemove', scrollX);
      e3.currentTarget.removeEventListener('mouseup', endScroll);
      e3.currentTarget.removeEventListener('mouseleave', endScroll);

      // *******************************************
      const interval = new Date().getTime() - initalTime.getTime();
      const distance = initialLocation - e3.clientX;

      let velocity = distance / interval;
      if (interval === 0) {
        velocity = distance / 0.1;
      }
      velocity *= 100;
      console.log('ini location: ', initialLocation, 'final location: ' , e3.clientX);
      console.log('interval: ', interval, ' diff: ', distance, 'velocity: ', velocity);
      const updateInterval = 0.1;
      const decreaseRatio = 0.05;
      const initalcount = Math.floor(1 / updateInterval);
      let count = initalcount;
      if (Math.abs(velocity) > 5) {
        scrollintervalItem = setInterval((e) => {
          if (Math.abs(velocity) > 2) {
            if (count > 0) {
              ele.scrollLeft += Math.floor(velocity  * updateInterval);
              count--;
            } else {
              count = initalcount;
              velocity = velocity * (1 - decreaseRatio);
            }
          } else {
            clearInterval(scrollintervalItem);
          }
        }, updateInterval);
      }

      // *******************************************
    }
  }
  startTouch(e1: TouchEvent) {
    var touchintervalItem;
    clearInterval(touchintervalItem);
    const initialLocation = e1.changedTouches[0].clientX;
    const initalTime = new Date();
    let previousLocation = initialLocation;

    const ele = document.querySelector('#normal-game-container');
    e1.currentTarget.addEventListener('touchmove', scrollX);
    e1.currentTarget.addEventListener('touchend', endScroll);
    e1.currentTarget.addEventListener('touchcancel', endScroll);

    function scrollX(e2: TouchEvent) {
      const delta =  previousLocation - e2.changedTouches[0].clientX ;
      ele.scrollLeft += delta;
      previousLocation = e2.changedTouches[0].clientX;
    }
    function endScroll(e3: TouchEvent) {
      e3.currentTarget.removeEventListener('touchmove', scrollX);
      e3.currentTarget.removeEventListener('touchend', endScroll);
      e3.currentTarget.removeEventListener('touchcancel', endScroll);

      // *******************************************
      const interval = new Date().getTime() - initalTime.getTime();
      const distance = initialLocation - e3.changedTouches[0].clientX;

      let velocity = distance / interval;
      if (interval === 0) {
        velocity = distance / 0.1;
      }
      velocity *= 100;
      console.log('ini location: ', initialLocation, 'final location: ' , e3.changedTouches[0].clientX);
      console.log('interval: ', interval, ' diff: ', distance, 'velocity: ', velocity);
      const updateInterval = 0.1;
      const decreaseRatio = 0.05;
      const initalcount = Math.floor(1 / updateInterval);
      let count = initalcount;
      if (Math.abs(velocity) > 5) {
        touchintervalItem = setInterval((e) => {
          if (Math.abs(velocity) > 2) {
            if (count > 0) {
              ele.scrollLeft += Math.floor(velocity  * updateInterval);
              count--;
            } else {
              count = initalcount;
              velocity = velocity * (1 - decreaseRatio);
            }
          } else {
            clearInterval(touchintervalItem);
          }
        }, updateInterval);
      }
      // *******************************************
    }
  }
}
