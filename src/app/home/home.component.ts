import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { AuthlogService } from '../service/authlog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayModal:boolean;
  cars:any[]
  constructor(public auth:AuthlogService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  expes:Expo[];
  expenses:Expo;
  submitted:boolean;
  ngOnInit(): void {
    this.cars=[{
      id:111,name:'mubashir'
    },{
      id:222,name:'musaddik'
    }]
    this.auth.getProducts().subscribe(data => this.expes = data);
    console.log(this.expes,"detail chekc")
  }
showModalDialog(){
  this.displayModal=true;
}

openNew() {
  this.expenses = {};
  this.submitted = false;
  this.displayModal = true;
}

// deleteSelectedProducts() {
//   this.confirmationService.confirm({
//       message: 'Are you sure you want to delete the selected products?',
//       header: 'Confirm',
//       icon: 'pi pi-exclamation-triangle',
//       accept: () => {
//           this.expes = this.expes.filter(val => !this.selectedExpos.includes(val));
//           this.selectedExpos = null;
//           this.messageService.add({severity:'success', summary: 'Successful', detail: 'Expos Deleted', life: 3000});
//       }
//   });
// }

editExpo(expenses: Expo) {
  this.expenses = {...expenses};
  this.displayModal = true;
}

deleteExpo(expenses: Expo) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + expenses.expensename + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.expes = this.expes.filter(val => val.id !== expenses.id);
          this.expenses = {};
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
  });
}

hideDialog() {
  this.displayModal = false;
  this.submitted = false;
}

saveProduct() {
  this.submitted = true;

  if (this.expenses.expensename.trim()) {
      if (this.expenses.id) {
          this.expes[this.findIndexById(this.expenses.id)] = this.expenses;                
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      }
      else {
          this.expenses.id = this.createId();
          this.expenses.added_by = 'Users';
          this.expes.push(this.expenses);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }

      this.expes = [...this.expes];
      this.displayModal = false;
      this.expenses = {};
  }
}

findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.expes.length; i++) {
      if (this.expes[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
}

createId(): string {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
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
  public id?:string;
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
