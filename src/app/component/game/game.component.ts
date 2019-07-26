import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private routerInfo: ActivatedRoute) { }

  ngOnInit() {
    console.log( this.routerInfo.snapshot.params.gameName );
  }

}
