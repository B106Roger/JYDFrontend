import { AuthGuardService } from './../../services/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Api } from '../../env';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [
    AuthGuardService
  ]
})

export class HistoryComponent implements OnInit {


  public selectPage: number;

  public currentRecord: AnalyserOptions;
  public gameRecord: any;
  public ioRecord: any;

  constructor(private http: HttpClient , private test: AuthGuardService, private router: Router, private translate: TranslateService) {}

  ngOnInit() {
      this.selectPage = 1;
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
}
