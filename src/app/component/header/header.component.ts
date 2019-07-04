import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  msuic = false;
  constructor() { }

  ngOnInit() {
  }

  getMusic() { return this.msuic; }
  printMusic() {console.log(this.msuic); }

}
