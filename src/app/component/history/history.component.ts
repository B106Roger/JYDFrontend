import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../../env';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})

export class HistoryComponent implements OnInit {

  public fields: string[];
  public gameHistoryTitle: string[];
  public ioHistoryTitle: string[];
  public selectPage: number;

  public currentRecord: AnalyserOptions;
  public gameRecord: any;
  public ioRecord: any;

  constructor(private http: HttpClient ) {}

  ngOnInit() {
      this.gameHistoryTitle = ['GAME' , 'DATE/TIME' , 'BET' , 'WIN' , 'BEGIN MONEY' , 'END MONEY'];
      this.ioHistoryTitle = ['NO.' , 'DATE/TIME' , 'BEFORE' , 'IN/OUT' , 'AFTER'];
      this.fields = this.gameHistoryTitle;
      this.selectPage = 1;
      console.log(Api);

  }

  tabChange( page ) {
    this.selectPage = page;
    this.fields = page ? this.gameHistoryTitle : this.ioHistoryTitle;
    this.currentRecord = page ? this.gameRecord : this.ioRecord;
  }

}
