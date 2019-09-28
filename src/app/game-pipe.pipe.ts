import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gamePipe',
  pure: true
})
export class GamePipePipe implements PipeTransform {

  transform(gameArray: any[], gameType: string, hotGame: boolean = false): any[] {
    if (hotGame === true) {
      if (gameType === 'all' || gameType === gameArray[0].GameType) {
        return [ gameArray[0] ];
      } else {
        return [ ];
      }
    }
    switch (gameType) {
      case 'all':
        return gameArray.filter((item, index) => index !== 0);
      case 'slot':
        return gameArray.filter((item, index) => item.GameType === 'slot' && index !== 0);
      case 'mario':
        return gameArray.filter((item, index) => item.GameType === 'mario' && index !== 0);
      case 'poker':
        return gameArray.filter((item, index) => item.GameType === 'poker' && index !== 0);
    }
  }

}
