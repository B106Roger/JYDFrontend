import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  hi() {
    return {background: 'url(\'/assets/imgs/btnLoginPressed.png\')'};
  }

}
