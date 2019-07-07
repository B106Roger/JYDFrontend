import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  images = [
    {
      gameName: 'Game1',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGame5Dragons.png',
      gameCategory: '',
      display: '1'
    },
    {
      gameName: 'Game1',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGame5Koi.png',
      gameCategory: '',
      display: '2'
    },
    {
      gameName: 'Game1',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGame50Dragons.png',
      gameCategory: '',
      display: '2'
    },
    {
      gameName: 'Game1',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGameAgent008.png',
      gameCategory: '',
      display: '2'
    },
    {
      gameName: 'Game1',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGame88Fortunes.png',
      gameCategory: '',
      display: '2'
    },
    {
      gameName: 'Game1',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGameBeanstalk.png',
      gameCategory: '',
      display: '2'
    },
    {
      gameName: 'Game1',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGameBuffalo.png',
      gameCategory: '',
      display: '2'
    },
    {
      gameName: 'Game1',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picBanner01.png',
      gameCategory: '',
      display: '3'
    },

  ];
  constructor() { }

  ngOnInit() {
  }

  hi() {
    return {background: 'url(\'/assets/imgs/btnLoginPressed.png\')'};
  }

  getNormalGame() {
    return this.images.filter((e) => e.display === '2');
  }
  getHotGame() {
    return this.images.filter((e) => e.display === '1');
  }
}
