import { Component, OnInit } from '@angular/core';

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
}
