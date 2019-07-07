import { Component, OnInit } from '@angular/core';
import { GameRecord } from './../../models/game-record';
import { InOutRecord } from './../../models/in-out-record';
import { UserService } from '../../services/user.service';

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

  public currentRecord: Array<GameRecord> | Array<InOutRecord>;
  public gameRecord: Array<GameRecord>;
  public ioRecord: Array<InOutRecord>;
  constructor(private userService: UserService) { }


  ngOnInit() {
      this.gameHistoryTitle = ['GAME' , 'DATE/TIME' , 'BET' , 'WIN' , 'BEGIN MONEY' , 'END MONEY'];
      this.ioHistoryTitle = ['NO.' , 'DATE/TIME' , 'BEFORE' , 'IN/OUT' , 'AFTER'];
      this.fields = this.gameHistoryTitle;
      this.selectPage = 1;
      this.gameRecord = this.userService.getGameRecords();

      this.ioRecord = this.userService.getInOutRecords();

      this.currentRecord = this.gameRecord;
      setTimeout(() => {
        console.log('fetch', this.userService.getGameRecords() );
        console.log('fetch', this.userService.getInOutRecords() );
        this.gameRecord = this.userService.getGameRecords();
        this.ioRecord = this.userService.getInOutRecords();
        this.currentRecord = this.gameRecord;
        console.log('currentRecord', this.gameRecord );
      }, 700);

      setTimeout(() => {
        console.log('currentRecord', this.currentRecord);
      }, 700);

      setTimeout(() => {
        console.log('gameRecord', this.gameRecord );
      }, 700);

  }

  tabChange( page ) {
    this.selectPage = page;
    this.fields = page ? this.gameHistoryTitle : this.ioHistoryTitle;
    this.currentRecord = page ? this.gameRecord : this.ioRecord;
  }

}
