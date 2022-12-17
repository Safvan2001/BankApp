import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  userDeatails:any={
    1000:{acno:1000,username:"anu",password:123,balance:0},
    1001:{acno:1001,username:"amal",password:123,balance:0},
    1002:{acno:1002,username:"arun",password:123,balance:0},
    1003:{acno:1003,username:"mega",password:123,balance:0}

  }
register(acno:any,uname:any,psw:any){
  var userDeatails=this.userDeatails
  if(acno in userDeatails){

    return false
  }else{
    userDeatails[acno]={acno,username:uname,password:psw,balance:0}
    console.log(userDeatails);
    
    
    return true
  }




}


}
