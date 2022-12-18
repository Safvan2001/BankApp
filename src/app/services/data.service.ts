import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
currentacno=""
  currentuser=""
  constructor() { }

  userDeatails:any={
    1000:{acno:1000,username:"anu",password:123,balance:0,transaction:[]},
    1001:{acno:1001,username:"amal",password:123,balance:0,transaction:[]},
    1002:{acno:1002,username:"arun",password:123,balance:0,transaction:[]},
    1003:{acno:1003,username:"mega",password:123,balance:0,transaction:[]}

  }
register(acno:any,uname:any,psw:any){
  var userDeatails=this.userDeatails
  if(acno in userDeatails){

    return false
  }else{
    userDeatails[acno]={acno,username:uname,password:psw,balance:0,transaction:[]}
    console.log(userDeatails);
    
    
    return true
  }




}

login(acno:any,psw:any){
  
  var userDeatails=this.userDeatails
  // alert('login clicked')

  // store acnumber
  this.currentacno=acno
  // store username
  this.currentuser=userDeatails[acno]["username"]

if(acno in userDeatails){
if(psw==userDeatails[acno]["password"]){

  //
return true
}else{
return false
}
}else{
return false
}


}
deposit(acno:any,password:any,amount:any){
  var userDeatails=this.userDeatails
  var amnt=parseInt(amount)
  if(acno in userDeatails){
  if(password==userDeatails[acno]["password"]){
   userDeatails[acno]["balance"]+=amnt
   userDeatails[acno]['transaction'].push({type:'CREDIT',amount:amnt})
   return userDeatails[acno]["balance"]

  }
  else{
    return false
  }

}else{
  return false
}

}

withdraw(acno:any,password:any,amount:any){
var userDeatails=this.userDeatails
var amnt=parseInt(amount)
if(acno in userDeatails){
  if (password==userDeatails[acno]["password"]) {
    if(amnt<=userDeatails[acno]["balance"]){
      userDeatails[acno]["balance"]-=amnt
      userDeatails[acno]['transaction'].push({type:'DEBIT',amount:amnt})
      return userDeatails[acno]["balance"]
    }else{
      alert("insufficient balance")
      return false
    }
    
  }else{
    alert("incurrect password")
    return false
  }
}else{
  alert("incurrect Acnumber")
  return false
}

}
gettransaction(acno:any){
  return this.userDeatails[acno]["transaction"]
}
}