import { Component, OnInit, Input , OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { precision } from '../../env';
import { isArray } from 'util';


@Component({
  selector: 'app-game-records',
  template:
  `
  <div class="recordTitle">
    <span style="width:16.5%">{{ 'history.gameRecord.game'     | translate }}</span>
    <span style="width:20.0%">{{ 'history.gameRecord.dateTime' | translate }}</span>
    <span style="width:12.0%">{{ 'history.gameRecord.bet' | translate }}</span>
    <span style="width:12.0%">{{ 'history.gameRecord.win' | translate }}</span>
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
      this.records = this.gameRecrods.slice( 0, 200 ).map(record => {
        return [
          record.gameName,
          record.dateTime.match(/[\d]+/g).slice(0 , 3).join('-') + ' ' + record.dateTime.match(/[\d]+/g).slice(3 , 6).join(':'),
          parseInt( record.betMoney    , 10).toFixed(precision),
          parseInt( record.winMoney    , 10).toFixed(precision),
          parseInt( record.beforeMoney , 10).toFixed(precision),
          parseInt( record.afterMoney  , 10).toFixed(precision),
        ];
      });
    }
  }
}
