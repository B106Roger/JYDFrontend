import { Component, OnInit, Input , OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isArray } from 'util';


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
      <span class="date-time"   style="width:22.5%">{{ record[1] }}</span>
      <span class="bet"         style="width:10.0%">{{ record[2] }}</span>
      <span class="win"         style="width:10.0%">{{ record[3] }}</span>
      <span class="begin-money" style="width:20.0%">{{ record[4] }}</span>
      <span class="end-money"   style="width:20.0%">{{ record[5] }}</span>
    </div>
  </div>
  `,
  styleUrls: ['./history.component.scss']
})


export class GameRecordsComponent implements OnInit , OnChanges {

  @Input() gameRecrods;

  public records = [];

  constructor() { }

  ngOnInit() { }

  ngOnChanges( changes: SimpleChanges ) {
    if ( isArray( this.gameRecrods ) ) {
      this.records = this.gameRecrods.map(record => {
        return [
          record.GameName,
          record.DateTime.match(/[\d]+/g).slice(0 , 3).join('-') + ' ' + record.DateTime.match(/[\d]+/g).slice(3 , 6).join(':'),
          parseInt(record.BetMoney , 10).toFixed(2),
          parseInt(record.WinMoney , 10).toFixed(2),
          parseInt( record.BeforeMoney , 10).toFixed(2),
          parseInt( record.AfterMoney  , 10).toFixed(2),
        ];
      });
    }
  }

}
