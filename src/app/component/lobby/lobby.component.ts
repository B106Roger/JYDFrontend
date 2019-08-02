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

  menuSelected = 'slots';
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
    let originLocation = e1.clientX;
    const ele = document.querySelector('#normal-game-container');
    e1.currentTarget.addEventListener('mousemove', scrollX);
    e1.currentTarget.addEventListener('mouseup', endScroll);
    e1.currentTarget.addEventListener('mouseleave', endScroll);

    function scrollX(e2: MouseEvent) {
      const delta =  originLocation - e2.clientX ;
      ele.scrollLeft += delta;
      originLocation = e2.clientX;
    }
    function endScroll(e3: MouseEvent) {
      e3.currentTarget.removeEventListener('mousemove', scrollX);
      e3.currentTarget.removeEventListener('mouseup', endScroll);
    }
  }
}
