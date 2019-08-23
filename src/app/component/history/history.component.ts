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
  public currentPage;
  public gameRecordTotalPage;
  public ioRecordTotalPage;
  constructor(private router: Router, private translate: TranslateService, private fetch: FetchService) { }

  ngOnInit() {
      const d = new Date();

      const initEndDate = d.toLocaleDateString().split('/').map( strDate => {
        const numDate = parseInt(strDate , 10);
        return numDate < 10 ? '0' + numDate : numDate;
      }).join('-');

      d.setTime( d.getTime() - 604800000 );
      const initStartDate = d.toLocaleDateString().split('/').map( strDate => {
        const numDate = parseInt(strDate , 10);
        return numDate < 10 ? '0' + numDate : numDate;
      }).join('-');


      this.selectPage = 1;
      this.startDate = initStartDate;
      this.endDate   = initEndDate;
      this.currentPage = 1;
      this.fetch.fetchGameRecords(this.startDate , this.endDate)
        .then(responseJson => {
          this.gameRecrods = responseJson.recordList;
          this.gameRecordTotalPage = responseJson.info.totalPages;
      });
      this.fetch.fetchInOutRecords(this.startDate , this.endDate)
        .then(responseJson => {
          this.ioRecrods = responseJson.recordList;
          this.ioRecordTotalPage = responseJson.info.totalPages;
      });
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

  setFirstPageBtnNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src', '/assets/imgs/btnFirstPageNormal@2x.png');
  }

  setFirstPageBtnPressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src', '/assets/imgs/btnFirstPagePressed@2x.png');
  }

  setPrevPageBtnNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src', '/assets/imgs/btnPreviousPageNormal@2x.png');
  }

  setPrevPageBtnPressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src', '/assets/imgs/btnPreviousPagePressed@2x.png');
  }

  setNextPageBtnNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src', '/assets/imgs/btnNextPageNormal@2x.png');
  }

  setNextPageBtnPressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src', '/assets/imgs/btnNextPagePressed@2x.png');
  }

  setFinalPageBtnNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src', '/assets/imgs/btnLastPageNormal@2x.png');
  }

  setFinalPageBtnPressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src', '/assets/imgs/btnLastPagePressed@2x.png');
  }

  startDateChange(e) {
    const nextStartDate = e.currentTarget.value;
    if ( nextStartDate != null ) {
      this.startDate = nextStartDate;
    }
  }

  endDateChange(e) {
    const nextEndDate = e.currentTarget.value;
    if ( nextEndDate != null ) {
      this.endDate = nextEndDate;
    }
  }

  changePage(value: number) {
    this.currentPage = parseInt( this.currentPage , 10 ) + value;
    this.currentPage = ( parseInt( this.currentPage , 10) < 1 ? 1 : this.currentPage);
    this.sendQuery();
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  // FIXME: 分頁待修正
  sendQuery() {
    this.fetch.fetchGameRecords(this.startDate , this.endDate , this.currentPage )
                .then(responseJson => { this.gameRecrods = responseJson.recordList; });

    this.fetch.fetchInOutRecords(this.startDate, this.endDate, this.currentPage )
              .then(responseJson => { this.ioRecrods = responseJson.recordList; });
  }
}
