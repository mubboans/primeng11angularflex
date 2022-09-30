import { Component, OnInit } from '@angular/core';
import {CheckboxModule} from 'primeng-lts/checkbox';
import { AuthlogService } from '../service/authlog.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  constructor(public authlog:AuthlogService) { }

  ngOnInit(): void {
  }
  loginUser(){
    const d={
      email:this.email,
      password:this.password
    }
    console.log(this.email,this.password,"value Check",JSON.stringify(d));
    this.authlog.fnLogUser(d).subscribe(x=>{
      console.log(x);
    })
  }

}
