import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-game-records',
  template:
  `
  <div class="recordTitle">
    <span style="width:17.5%">{{ 'history.gameRecord.game'     | translate }}</span>
    <span style="width:22.5%">{{ 'history.gameRecord.dateTime' | translate }}</span>
    <span style="width:10.0%">{{ 'history.gameRecord.bet' | translate }}</span>
    <span style="width:10.0%">{{ 'history.gameRecord.win' | translate }}</span>
    <span style="width:20.0%">{{ 'history.gameRecord.beginMoney' | translate }}</span>
    <span style="width:20.0%">{{ 'history.gameRecord.endMoney'   | translate }}</span>
  </div>

  <div class="records-container">
    <div class="recordBody" *ngFor="let record of records">
      <span class="game-name"   style="width:17.5%">{{ record[0] }}</span>
      <span class="bet"         style="width:22.5%">{{ record[1] }}</span>
      <span class="date-time"   style="width:10.0%">{{ record[2] }}</span>
      <span class="win"         style="width:10.0%">{{ record[3] }}</span>
      <span class="begin-money" style="width:20.0%">{{ record[4] }}</span>
      <span class="end-money"   style="width:20.0%">{{ record[5] }}</span>
    </div>
  </div>
  `,
  styleUrls: ['./history.component.scss']
})

export class GameRecordsComponent implements OnInit {

  public records = [];
  constructor() { }

  ngOnInit() {
    for (let i = 0 ; i < 30 ; ++i) {
      this.records.push( ['KING OF MOUTAIN' , '2019-06-04 05:53:20' , '2.25' , '6.75' , '27305.50' , '27312.25'] );
    }
  }

}
