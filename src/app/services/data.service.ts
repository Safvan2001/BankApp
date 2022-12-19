import { jsDocComment } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  userDeatails:any
currentacno=""
  currentuser=""
  




  constructor() {this.getdetails()}
  savedetails(){
if(this.userDeatails){
  localStorage.setItem("database",JSON.stringify(this.userDeatails))
}
if(this.currentuser){
  localStorage.setItem('currentuser',JSON.stringify(this.currentuser))
}
if(this.currentacno){
  localStorage.setItem('currentacno',JSON.stringify(this.currentacno))
}
  }
  getdetails(){
    if(localStorage.getItem('database')){
      this.userDeatails=JSON.parse(localStorage.getItem('database') || '')
    }
    if(localStorage.getItem('currentuser')){
      this.currentuser=JSON.parse(localStorage.getItem('currentuser') || '')
    }
    if(localStorage.getItem('currentacno')){
      this.currentacno=JSON.parse(localStorage.getItem('currentacno') || '')
    }
  }

  // userDeatails:any={
  //   1000:{acno:1000,username:"anu",password:123,balance:0,transaction:[]},
  //   1001:{acno:1001,username:"amal",password:123,balance:0,transaction:[]},
  //   1002:{acno:1002,username:"arun",password:123,balance:0,transaction:[]},
  //   1003:{acno:1003,username:"mega",password:123,balance:0,transaction:[]}

  // }
register(acno:any,uname:any,psw:any){
  var userDeatails=this.userDeatails
  if(acno in userDeatails){

    return false
  }else{
    userDeatails[acno]={acno,username: uname,password: psw,balance:0,transaction:[]}
    
    console.log(userDeatails);
    this.savedetails()
    
    return true
  }




}

login(acno:any,psw:any){
  
  var userDeatails=this.userDeatails
  // alert('login clicked')

  
  

if(acno in userDeatails){
if(psw==userDeatails[acno]["password"]){
  // store acnumber
  this.currentacno=acno
// store username
this.currentuser=userDeatails[acno]["username"]
  //
  this.savedetails()
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
   this. savedetails()
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
      this.savedetails()
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