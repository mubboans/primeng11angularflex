import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayModal:boolean;
  cars:any[]
  constructor() { }

  ngOnInit(): void {
    this.cars=[{
      id:111,name:'mubashir'
    },{
      id:222,name:'musaddik'
    }]
  }
showModalDialog(){
  this.displayModal=true;
}
}
export class Expo{
  public expensename?:string;
  public expensedetail?:string;
  public catygery?:Caty;
  public date?:string;
  public isRecoverable?:boolean;
  public added_by?:string;
  public added_on?:string;
  public history?:Array<History>;
}
export class History{
  public id?: number;     
  public event?: string; 
  public date?: string;
}
export class Caty{
public id?:number;
public name?:string;
}
