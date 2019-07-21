import { Component, OnInit } from '@angular/core';
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
export class IoRecordsComponent implements OnInit {

  public records = [];
  constructor() { }

  ngOnInit() {
    for (let i = 0 ; i < 30 ; ++i) {
      this.records.push( ['299490' , '2019-06-04 05:53:20' , '570900.00' , '-900' , '570000.00'] );
    }
  }

}
