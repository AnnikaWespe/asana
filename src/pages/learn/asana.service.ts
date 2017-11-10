import {Injectable} from '@angular/core';
import {INITIAL_ASANA_LIST} from "./asana.data";

@Injectable()
export class AsanaService {

  playedBefore: boolean;
  newAsana = [];
  asanaBlock0 = {asana: [], ageOfBlock: 0};
  asanaBlock1 = {asana: [], ageOfBlock: 0};
  asanaBlock2 = {asana: [], ageOfBlock: 0};
  asanaBlock3 = {asana: [], ageOfBlock: 0};
  asanaBlock4 = {asana: [], ageOfBlock: 0};


  constructor() {
    this.playedBefore = (localStorage.getItem("playedBefore") === "true");
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
    this.shuffle(this.newAsana);
    this.asanaBlock0.asana = this.newAsana.splice(0,3);
    this.updateLocalStorage();
  }

  resumeGame() {
    this.getDataFromLocalStorage();
  }

  addFourNewAsana() {

  }

  resetGame() {

  }

  next() {

  }

  private shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private updateLocalStorage() {
    localStorage.setItem("newAsana", this.newAsana.toString());
    localStorage.setItem("asanaBlock0", this.asanaBlock0.toString());
    localStorage.setItem("asanaBlock1", this.asanaBlock1.toString());
    localStorage.setItem("asanaBlock2", this.asanaBlock2.toString());
    localStorage.setItem("asanaBlock3", this.asanaBlock3.toString());
    localStorage.setItem("asanaBlock4", this.asanaBlock4.toString());
  }

  private getDataFromLocalStorage(){
    this.newAsana = JSON.parse(localStorage.getItem("newAsana"));
    this.asanaBlock0 = JSON.parse(localStorage.getItem("asanaBlock0"));
    this.asanaBlock1 = JSON.parse(localStorage.getItem("asanaBlock1"));
    this.asanaBlock2 = JSON.parse(localStorage.getItem("asanaBlock2"));
    this.asanaBlock3 = JSON.parse(localStorage.getItem("asanaBlock3"));
    this.asanaBlock4 = JSON.parse(localStorage.getItem("asanaBlock4"));
  }
}
