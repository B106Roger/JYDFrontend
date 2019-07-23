import { AuthGuardService } from './../../services/auth-guard.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Api } from '../../env';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {


  public startDate;
  public endDate;
  public selectPage: number;

  public currentRecord: AnalyserOptions;
  public gameRecord: any;
  public ioRecord: any;

  constructor(private http: HttpClient,
              private router: Router,
              private translate: TranslateService,
              private auth: AuthGuardService
              ) {}

  ngOnInit() {
      const d = new Date();
      const dealDate = d.toLocaleDateString().split('/').map( strDate => {
        const numDate = parseInt(strDate , 10);
        return numDate / 10 > 1 ? numDate : '0' + numDate;
      }).join('-');
      this.selectPage = 1;
      this.startDate = dealDate;
      this.endDate   = dealDate;
      console.log(this.auth.test);
  }

  tabChange( page ) {
    this.selectPage = page;
    if ( page ) {
      this.router.navigate(['/history/gameRecords']);
    } else {
      this.router.navigate(['/history/inoutRecords']);
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

  startDateChange(e) {
    const nextStartDate = e.currentTarget.value;
    this.startDate = nextStartDate;
  }

  endDateChange(e) {
    const nextEndDate = e.currentTarget.value;
    this.endDate = nextEndDate;
  }

}
