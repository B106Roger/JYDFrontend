import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gamePipe',
  pure: true
})
export class GamePipePipe implements PipeTransform {

  transform(gameArray: any[], gameType: string, hotGame: boolean = false): any[] {
    if (hotGame === true) {
      if (gameType === 'all' || gameType === gameArray[0].gameCategory) {
        return [ gameArray[0] ];
      } else {
        return [];
      }
    }
    switch (gameType) {
      case 'all':
        return gameArray.filter((item, index) => index !== 0);
      case 'slots':
        return gameArray.filter((item, index) => item.gameCategory === 'slots' && index !== 0);
      case 'marry':
        return gameArray.filter((item, index) => item.gameCategory === 'marry' && index !== 0);
      case 'poker':
        return gameArray.filter((item, index) => item.gameCategory === 'poker' && index !== 0);
    }
  }

}
