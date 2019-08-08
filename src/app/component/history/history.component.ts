import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FetchService } from './../../services/fetch.service';
import { GameRecordsComponent } from './game-records.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {


  public startDate: string;
  public endDate: string;
  public selectPage: number;
  public gameRecrods;
  public ioRecrods;
  constructor(private router: Router, private translate: TranslateService, private fetch: FetchService) { }

  ngOnInit() {
      const d = new Date();

      const initEndDate = d.toLocaleDateString().split('/').map( strDate => {
        const numDate = parseInt(strDate , 10);
        return numDate / 10 > 1 ? numDate : '0' + numDate;
      }).join('-');

      d.setTime( d.getTime() - 604800000 );
      const initStartDate = d.toLocaleDateString().split('/').map( strDate => {
        const numDate = parseInt(strDate , 10);
        return numDate / 10 > 1 ? numDate : '0' + numDate;
      }).join('-');


      this.selectPage = 1;
      this.startDate = initStartDate;
      this.endDate   = initEndDate;
      this.fetch.fetchGameRecords(this.startDate , this.endDate)
                  .then(responseJson => { this.gameRecrods = responseJson.RecordList; });
      this.fetch.fetchInOutRecords(this.startDate , this.endDate)
                  .then(responseJson => { this.ioRecrods = responseJson.RecordList; });
  }

  tabChange( page ) {
    this.selectPage = page;
  }

  setGoNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('history.goImgNormal'));
  }

  setGoPressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('history.goImgPressed'));
  }

  setDatepickerNormal( id ) {
    document.getElementById( id ).setAttribute('src' , '/assets/imgs/btnCalendarNormal@2x.png');
  }

  setDatepickerPressed( id ) {
    document.getElementById( id ).setAttribute('src' , '/assets/imgs/btnCalendarPressed@2x.png');
  }

  startDateChange(e) {
    const nextStartDate = e.currentTarget.value;
    this.startDate = nextStartDate;
  }

  endDateChange(e) {
    const nextEndDate = e.currentTarget.value;
    this.endDate = nextEndDate;
  }

  sendQuery() {
    this.fetch.fetchGameRecords(this.startDate , this.endDate)
                .then(responseJson => { this.gameRecrods = responseJson.recordList; });

    this.fetch.fetchInOutRecords(this.startDate , this.endDate)
              .then(responseJson => { this.ioRecrods = responseJson.recordList; });
  }
}
