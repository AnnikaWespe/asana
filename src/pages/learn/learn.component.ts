import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AsanaService} from "./asana/asana.service";
import {Asana} from "./asana/asana.model";

@Component({
  selector: 'page-learn',
  templateUrl: 'learn.component.html'
})
export class LearnComponent {

  asana: Asana;
  asanaBlockName: string;
  stage = 'question';

  constructor(private asanaService: AsanaService) {
    let object = this.asanaService.next();
    console.log(object);
    if(object){
      this.asana = object.asana;
      this.asanaBlockName = object.asanaBlockName;
    }
  }



  getAnswer(){
    this.stage = 'answer';
  }

  next(rightAnswer: boolean){
    let object = this.asanaService.next(this.asanaBlockName, rightAnswer);
    if(object){
      this.asana = object.asana;
      this.asanaBlockName = object.asanaBlockName;
    }
    else{
      this.stage = 'finished';
    }
  }

}
