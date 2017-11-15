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
  stillNewAsanaToAdd;

  constructor(private asanaService: AsanaService) {
    let object = this.asanaService.next();
    if(object){
      this.currentAsana = object;
    }
    else{
        let boxesInfoObject = this.asanaService.stillAsanaAvailable();
        if(boxesInfoObject.stillAsanaAvailable){
        this.stage = 'finishedForToday';
        this.stillNewAsanaToAdd = boxesInfoObject.stillNewAsanaToAdd;
          }
        else {
          this.stage = "finished";
          }
      }
  }



  getAnswer(){
    this.stage = 'answer';
  }

  next(rightAnswer: boolean){
    let object = this.asanaService.next(this.currentAsana.asanaBlockName, rightAnswer);
    if(object){
      this.currentAsana = object;
    //  this.stage = "question";
    }
    else{
        let boxesInfoObject = this.asanaService.stillAsanaAvailable()
        if(boxesInfoObject.stillAsanaAvailable){
        this.stage = 'finishedForToday';
        this.stillNewAsanaToAdd = boxesInfoObject.stillNewAsanaToAdd;
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
