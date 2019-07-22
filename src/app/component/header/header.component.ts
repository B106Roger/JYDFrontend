import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  msuic = false;
  sound = false;
  constructor() { }

  ngOnInit() {
  }

  getMusic() { return this.msuic; }
  printMusic() { console.log(!this.msuic); }
  getSound() { return this.sound; }
  printSound() { console.log(!this.sound); }
  showLogoutBox() {
      document.getElementById('logout-box').hidden = false;
  }
}
