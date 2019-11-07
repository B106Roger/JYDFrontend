import { Component, OnInit, Input , OnChanges, SimpleChanges } from '@angular/core';
import { precision } from '../../env';
import { isArray } from 'util';
@Component({
  selector: 'app-io-records',
  template:
  `
  <div class="recordTitle">
    <span style="width:15.0%">{{ 'history.inoutRecord.no'     | translate }}</span>
    <span style="width:20.0%">{{ 'history.inoutRecord.dateTime' | translate }}</span>
    <span style="width:22.5%">{{ 'history.inoutRecord.before' | translate }}</span>
    <span style="width:20.0%">{{ 'history.inoutRecord.inout' | translate }}</span>
    <span style="width:22.5%">{{ 'history.inoutRecord.after' | translate }}</span>
  </div>

  <div class="records-container">
    <div class="recordBody" *ngFor="let record of records">
      <span class="no"        style="width:15.0%">{{ record[0] }}</span>
      <span class="date-time" style="width:20.0%">{{ record[1] }}</span>
      <span class="befor"     style="width:22.5%">{{ record[2] }}</span>
      <span class="in-out"    style="width:20.0%">{{ record[3] }}</span>
      <span class="after"     style="width:22.5%">{{ record[4] }}</span>
    </div>
  </div>
  `,
  styleUrls: ['./history.component.scss']
})
export class IoRecordsComponent implements OnInit , OnChanges {

  @Input() ioRecrods;

  public records = [];

  constructor() { }

  ngOnInit() { }

  ngOnChanges( changes: SimpleChanges ) {
    /*  {
      "AutoID": 36,
      "UserID": "test006",
      "DateTime": "2019-05-13T10:15:34.987",
      "BeforeMoney": 303616,
      "AfterMoney": 303606
    }, */
    if ( isArray( this.ioRecrods ) ) {
      this.records = this.ioRecrods.slice( 0, 200 ).map(record => {
        return [
          record.autoID,
          record.dateTime.match(/[\d]+/g).slice(0, 3).join('-') + ' ' + record.dateTime.match(/[\d]+/g).slice(3 , 6).join(':'),
          parseInt( record.beforeMoney , 10).toFixed(precision),
          (record.afterMoney - record.beforeMoney).toFixed(precision),
          parseInt( record.afterMoney  , 10).toFixed(precision),
        ];
      });
    }
  }
}
