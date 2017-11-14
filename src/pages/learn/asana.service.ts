import {Injectable} from '@angular/core';
import {INITIAL_ASANA_LIST} from "./asana.data";
import {Asana, AsanaBlock} from './asana.model';


@Injectable()
export class AsanaService {

  playedBefore: boolean;
  newAsana: Asana[] = [];
  asanaBlock0 = new AsanaBlock([], 0);
  asanaBlock1 = new AsanaBlock([], 24);
  asanaBlock2 = new AsanaBlock([], 48);
  asanaBlock3 = new AsanaBlock([], 120);
  asanaBlock4 = new AsanaBlock([], 480);
  now: number;


  constructor() {
    this.playedBefore = (localStorage.getItem("playedBefore") === "true");
    this.now = new Date().getTime() / 3600000;
    if (!this.playedBefore) {
      this.initiateGame();
    }
    else {
      this.resumeGame()
    }
  }

  private initiateGame() {
    this.playedBefore = true;
    localStorage.setItem("playedBefore", "true");
    this.newAsana = INITIAL_ASANA_LIST;
    this.shuffleAll();
    this.asanaBlock0.asanaArray = this.newAsana.splice(0, 4);
    this.updateLocalStorage();
  }

  resumeGame() {
    this.getDataFromLocalStorage();
    this.shuffleAll();
  }

  addFourNewAsana() {
    this.asanaBlock0.asanaArray = this.newAsana.splice(0, 3);
    this.updateLocalStorage();
  }

  resetGame() {
    localStorage.clear();
  }

  next(asanaName?: string, asanaBlockName?: string, knownByUser?: boolean) {
    if (asanaName) {
      this.updateAsanaBlocksAccordingToUserAnswer(asanaName, asanaBlockName, knownByUser)
    }
    for (let i = 4; i > -1; i--) {
      if (this.checkAgeAndIfNonEmpty(this['asanaBlock' + i])) {
        return {
          asana: this['asanaBlock' + i].asanaArray[0],
          asanaBlockName: 'asanaBlock' + i
        };
      }
    }
    this.updateLocalStorage();
  }

  checkAgeAndIfNonEmpty(asanaBlock: AsanaBlock) {
    console.log('now', this.now, 'then', asanaBlock.timeStamp, 'diff in hrs', (this.now - asanaBlock.timeStamp) / 24)
    if (asanaBlock.asanaArray.length && (this.now - asanaBlock.timeStamp) / 24 >= asanaBlock.repeatAfterTimeIntervalInHours) {
      console.log(asanaBlock);
      return true;
    }
    else {
      return false;
    }
  }

  private updateAsanaBlocksAccordingToUserAnswer(asanaName, asanaBlockName, knownByUser) {
    if (knownByUser) {
      let numberOfBlock = Number(asanaBlockName[11]);
      console.log(numberOfBlock);
      this[asanaBlockName].asanaArray = this[asanaBlockName].asanaArray.filter(function (asana) {
        return asana.name !== asanaName
      })
      if (numberOfBlock < 4) {
        this["asanaBlock" + (numberOfBlock + 1)].asanaArray.append()
      }


    }
    else {

    }
  }

  private shuffleAll() {
    for (let i = 0; i < 5; i++) {
      this.shuffle(this['asanaBlock' + i])
    }
    ;
    this.shuffle(this.newAsana);
  }

  private shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private updateLocalStorage() {
    for (let i = 0; i < 5; i++) {
      localStorage.setItem('asanaBlock' + i, JSON.stringify(this['asanaBlock' + i]))
    }
    ;
    localStorage.setItem('newAsana', JSON.stringify(this.newAsana))
  }

  private getDataFromLocalStorage() {
    this.newAsana = JSON.parse(localStorage.getItem("newAsana"));
    this.asanaBlock0 = JSON.parse(localStorage.getItem("asanaBlock0"));
    this.asanaBlock1 = JSON.parse(localStorage.getItem("asanaBlock1"));
    this.asanaBlock2 = JSON.parse(localStorage.getItem("asanaBlock2"));
    this.asanaBlock3 = JSON.parse(localStorage.getItem("asanaBlock3"));
    this.asanaBlock4 = JSON.parse(localStorage.getItem("asanaBlock4"));
  }
}
