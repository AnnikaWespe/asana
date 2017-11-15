import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AsanaService} from "./asana/asana.service";
import {Asana} from "./asana/asana.model";

@Component({
  selector: 'page-learn',
  templateUrl: 'learn.component.html'
})
export class LearnComponent {

  currentAsana: {
      asana: Asana,
      asanaBlockName: string;
  }
  stage = 'question';

  constructor(private asanaService: AsanaService) {
    let object = this.asanaService.next();
    if(object){
      this.currentAsana = object;
    }
    else {this.stage = "finished"}
  }



  getAnswer(){
    this.stage = 'answer';
  }

  next(rightAnswer: boolean){
    let object = this.asanaService.next(this.currentAsana.asanaBlockName, rightAnswer);
    if(object){
      this.currentAsana = object;
    }
    else{
      if(this.asanaService.stillAsanasAvailable){
              this.stage = 'finishedForToday';
      }
      else {
        this.stage = "finished";
      }
    }
  }


  addSixNewAsana(){
    this.currentAsana = this.asanaService.addSixNewAsana();
    console.log(this.currentAsana);
    this.stage = "question"
  }

  reset(){
    this.asanaService.resetGame();
    this.currentAsana = this.asanaService.next();
  }

}
