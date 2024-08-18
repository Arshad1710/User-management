import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    NavbarComponent,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginObj: any={
    "Emailid":"",
    "Password": ""
  }
  router =inject(Router)
  validCrediendial:any[]=[
    {
      Emailid:'admin@admin.com',
      Password: 'pas1',
      Role:'admin'

    },
    {
      Emailid:'cus@admin.com',
      Password: 'pas1',
      Role:'customer'

    }
  ]
  onlogin(){
const user= this.validCrediendial.find(
  u=>u.Emailid === this.loginObj.Emailid && u.Password === this.loginObj.Password
);
if(user){
  const res={
    result: true,
    data: {
      userId: 1,
      email: this.loginObj.Emailid,
      role:user.Role
    }
  };
  localStorage.setItem('userApp', JSON.stringify(res.data));
  if(user.Role === 'admin'){
    this.router.navigateByUrl('home');  
  }else if(user.Role === 'customer'){
    this.router.navigateByUrl('product'); 
  }
}else{
  alert('invalid email or password')
}
  }
}
