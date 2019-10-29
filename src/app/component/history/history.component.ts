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
  public selectTab: number;
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

      d.setTime(d.getTime() - 604800000); // 604800000 = 7day * 24hr * 60min * 60sec * 1000ms
      const initStartDate = d.toLocaleDateString().split('/').map( strDate => {
        const numDate = parseInt(strDate , 10);
        return numDate < 10 ? '0' + numDate : numDate;
      }).join('-');

      if ('historyCache' in sessionStorage) {
        const snapshot = JSON.parse(sessionStorage.getItem('historyCache'));
        this.selectTab = snapshot.selectTab;
        this.startDate = snapshot.startDate;
        this.endDate = snapshot.endDate;
        this.currentPage = snapshot.currentPage;
        if (this.selectTab === 0) {
          setTimeout(() => {
            document.querySelector('#tab-00').setAttribute('srcset', this.translate.instant('history.labelGameHistoryPressed'));
            document.querySelector('#tab-01').setAttribute('srcset', this.translate.instant('history.labelInOutHistoryNormal'));
          }, 0);
        } else {
          setTimeout( () => {
            document.querySelector('#tab-00').setAttribute('srcset', this.translate.instant('history.labelGameHistoryNormal'));
            document.querySelector('#tab-01').setAttribute('srcset', this.translate.instant('history.labelInOutHistoryPressed'));
          }, 0);
        }
        this.gameRecrods = snapshot.gameRecrods;
        this.gameRecordTotalPage = snapshot.gameRecordTotalPage;
        this.ioRecrods = snapshot.ioRecrods;
        this.ioRecordTotalPage = snapshot.ioRecordTotalPage;
      } else {
        this.selectTab = 0;
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
      selectTab: this.selectTab,
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
    this.selectTab = page;
    const maxPage = this.selectTab ? this.gameRecordTotalPage - 1 : this.ioRecordTotalPage - 1 ;
    if (this.currentPage > maxPage) {
      this.currentPage = maxPage;
    }
    if ( page === 0) {
      document.querySelector('#tab-00').setAttribute('srcset', this.translate.instant('history.labelGameHistoryPressed'));
      document.querySelector('#tab-01').setAttribute('srcset', this.translate.instant('history.labelInOutHistoryNormal'));
    } else {
      document.querySelector('#tab-00').setAttribute('srcset', this.translate.instant('history.labelGameHistoryNormal'));
      document.querySelector('#tab-01').setAttribute('srcset', this.translate.instant('history.labelInOutHistoryPressed'));
    }
    this.currentPage = 0;
    this.sendQuery();
  }

  setGoNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset' , this.translate.instant('history.goImgNormal'));
  }

  setGoPressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset' , this.translate.instant('history.goImgPressed'));
  }

  setDatepickerNormal( id ) {
    document.getElementById( id ).setAttribute('srcset' , '/assets/imgs/btnCalendarNormal@2x.png');
  }

  setDatepickerPressed( id ) {
    document.getElementById( id ).setAttribute('srcset' , '/assets/imgs/btnCalendarPressed@2x.png');
  }

  setFirstPageBtnNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset', '/assets/imgs/btnFirstPageNormal@2x.png');
  }

  setFirstPageBtnPressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset', '/assets/imgs/btnFirstPagePressed@2x.png');
  }

  setPrevPageBtnNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset', '/assets/imgs/btnPreviousPageNormal@2x.png');
  }

  setPrevPageBtnPressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset', '/assets/imgs/btnPreviousPagePressed@2x.png');
  }

  setNextPageBtnNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset', '/assets/imgs/btnNextPageNormal@2x.png');
  }

  setNextPageBtnPressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset', '/assets/imgs/btnNextPagePressed@2x.png');
  }

  setFinalPageBtnNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset', '/assets/imgs/btnLastPageNormal@2x.png');
  }

  setFinalPageBtnPressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset', '/assets/imgs/btnLastPagePressed@2x.png');
  }

  startDateChange(e) {
    const nextStartDate = e.currentTarget.value;
    if ( nextStartDate != null ) {
      this.startDate = Date.parse(nextStartDate) < Date.parse(this.endDate) ? nextStartDate : this.endDate;
    }
  }

  endDateChange(e) {
    const nextEndDate = e.currentTarget.value;
    if ( nextEndDate != null ) {
      this.endDate = Date.parse(nextEndDate) > Date.parse(this.startDate) ? nextEndDate : this.startDate;
    }
  }

  changePage(value: number) {
    const maxPage = this.selectTab ? this.gameRecordTotalPage - 1 : this.ioRecordTotalPage - 1;
    let temp;
    temp = parseInt( this.currentPage , 10 ) + value;
    temp = (temp > maxPage ? maxPage : temp );
    temp = (temp < 0 ? 0 : temp );
    if (parseInt(this.currentPage, 10) !== temp ) {
      this.currentPage = temp;
      this.sendQuery();
    }
  }

  setPage(page: number) {
    if (parseInt(this.currentPage, 10) ) {
      this.currentPage = page;
      this.sendQuery();
    }
  }

  sendQuery() {
    Promise.all([
      this.fetch.fetchGameRecords(this.startDate, this.endDate, this.currentPage)
        .then(responseJson => {
          this.gameRecrods = responseJson.recordList;
          this.gameRecordTotalPage = responseJson.info.totalPages;
        }),

      this.fetch.fetchInOutRecords(this.startDate, this.endDate, this.currentPage)
        .then(responseJson => {
          this.ioRecrods = responseJson.recordList;
          this.ioRecordTotalPage = responseJson.info.totalPages;
        })
    ]);
  }

  btnSound(soundName: string) {
    if (window['sound'] === true) {
      const sound = document.querySelector('#' + soundName) as HTMLAudioElement;
      sound.currentTime = 0;
      sound.play().catch(err => {
        console.log(err);
      });
    }
  }

}
