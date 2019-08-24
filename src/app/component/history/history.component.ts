import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FetchService } from './../../services/fetch.service';
import { GameRecordsComponent } from './game-records.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit, OnDestroy {


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

      if ('historyCache' in sessionStorage) {
        const snapshot = JSON.parse(sessionStorage.getItem('historyCache'));
        this.selectPage = snapshot.selectPage;
        this.startDate = snapshot.startDate;
        this.endDate = snapshot.endDate;
        this.currentPage = snapshot.currentPage;
        this.gameRecrods = snapshot.gameRecrods;
        this.gameRecordTotalPage = snapshot.gameRecordTotalPage;
        this.ioRecrods = snapshot.ioRecrods;
        this.ioRecordTotalPage = snapshot.ioRecordTotalPage;
      } else {
        this.selectPage = 1;
        this.startDate = initStartDate;
        this.endDate = initEndDate;
        this.currentPage = 0;
        this.fetch.fetchGameRecords(this.startDate, this.endDate)
          .then(responseJson => {
            this.gameRecrods = responseJson.recordList;
            this.gameRecordTotalPage = responseJson.info.totalPages;
          });
        this.fetch.fetchInOutRecords(this.startDate, this.endDate)
          .then(responseJson => {
            this.ioRecrods = responseJson.recordList;
            this.ioRecordTotalPage = responseJson.info.totalPages;
          });
      }
  }

  ngOnDestroy() {
    sessionStorage.setItem('historyCache' , JSON.stringify({
      selectPage: this.selectPage,
      startDate: this.startDate,
      endDate: this.endDate,
      currentPage: this.currentPage,
      gameRecrods: this.gameRecrods,
      gameRecordTotalPage: this.gameRecordTotalPage,
      ioRecrods: this.ioRecrods,
      ioRecordTotalPage: this.ioRecordTotalPage
    }));
  }
  tabChange( page ) {
    this.selectPage = page;
    const maxPage = this.selectPage ? this.gameRecordTotalPage - 1 : this.ioRecordTotalPage - 1 ;
    if (this.currentPage > maxPage) {
      this.currentPage = maxPage;
      this.sendQuery();
    }
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
    const maxPage = this.selectPage ? this.gameRecordTotalPage - 1 : this.ioRecordTotalPage - 1;
    let temp;
    temp = parseInt( this.currentPage , 10 ) + value;
    temp = (temp < 0 ? 0 : temp );
    temp = (temp > maxPage ? maxPage : temp );
    if (parseInt(this.currentPage, 10) !== temp ) {
      this.currentPage = temp;
      this.sendQuery();
    }
  }

  setPage(page: number) {
    if (parseInt(this.currentPage, 10) !== page) {
      this.currentPage = page;
      this.sendQuery();
    }
  }

  sendQuery() {
    this.fetch.fetchGameRecords(this.startDate , this.endDate , this.currentPage )
                .then(responseJson => { this.gameRecrods = responseJson.recordList; });

    this.fetch.fetchInOutRecords(this.startDate, this.endDate, this.currentPage )
                .then(responseJson => { this.ioRecrods = responseJson.recordList; });
  }
}
