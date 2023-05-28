import { Component } from '@angular/core';
//form group will handle our complete form and will tell what we enter is valid or not
//form control specifically handle a input field
//import { FormGroup,FormControl,Validators} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user';
  // loginForm=new FormGroup({
  //   //user:new FormControl('',[Validators.required,Validators.email]),
  //   user:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]+$')]),
  //   password:new FormControl('',[Validators.required,Validators.minLength(5)]),
  // });

  // loginUser(){
  //   console.warn(this.loginForm.value);
  // }
  // get user(){//any name
  //   return this.loginForm.get('user');
  // }
  // get password(){
  //   return this.loginForm.get('password');
  // }

}
