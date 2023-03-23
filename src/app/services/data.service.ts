import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jsDocComment } from '@angular/compiler';
import { Injectable } from '@angular/core';
// global overloading headers
const option={
 headers:new HttpHeaders()
}
let headers=new HttpHeaders()


@Injectable({
  providedIn: 'root'
})
export class DataService {


  userDeatails: any
  currentacno = ""
  currentuser = ""





  constructor(private http: HttpClient) {
    
  }
  savedetails() {
    if (this.userDeatails) {
      localStorage.setItem("database", JSON.stringify(this.userDeatails))
    }
    if (this.currentuser) {
      localStorage.setItem('currentuser', JSON.stringify(this.currentuser))
    }
    if (this.currentacno) {
      localStorage.setItem('currentacno', JSON.stringify(this.currentacno))
    }
  }
  getdetails() {
    if (localStorage.getItem('database')) {
      this.userDeatails = JSON.parse(localStorage.getItem('database') || '')
    }
    if (localStorage.getItem('currentuser')) {
      this.currentuser = JSON.parse(localStorage.getItem('currentuser') || '')
    }
    if (localStorage.getItem('currentacno')) {
      this.currentacno = JSON.parse(localStorage.getItem('currentacno') || '')
    }
  }

  // userDeatails:any={
  //   1000:{acno:1000,username:"anu",password:123,balance:0,transaction:[]},
  //   1001:{acno:1001,username:"amal",password:123,balance:0,transaction:[]},
  //   1002:{acno:1002,username:"arun",password:123,balance:0,transaction:[]},
  //   1003:{acno:1003,username:"mega",password:123,balance:0,transaction:[]}

  // }
  gettoken(){
   const token=JSON.parse(localStorage.getItem('token')|| '')

   let headers=new HttpHeaders()
   if(token){
    option.headers=headers.append('access-token',token)

   }

   return option
   


  }
  register(acno: any, uname: any, psw: any) {



    const data ={
      acno,uname,psw
    }

   return this.http.post('http://localhost:3000/register',data)
   
  // var userDeatails = this.userDeatails

  //   if (acno in userDeatails) {

  //     return false
  //   } else {
  //     userDeatails[acno] = { acno, username: uname, password: psw, balance: 0, transaction: [] }

  //     console.log(userDeatails);
  //     this.savedetails()

  //     return true
  //   }




  }

  login(acno: any, psw: any) {

    
    const data ={
      acno,psw
    }

   return this.http.post('http://localhost:3000/login',data)
    


  }
  deposit(acno: any, password: any, amount: any) {
    const data ={
      acno,psw:password,amount
    }

   return this.http.post('http://localhost:3000/deposit',data,this.gettoken())

  }

  withdraw(acno: any, password: any, amount: any) {
    const data ={
      acno,psw:password,amount
    }

   return this.http.post('http://localhost:3000/withdraw',data,this.gettoken())

  }
  gettransaction(acno: any) {
    const data ={
      acno
    }

   return this.http.post('http://localhost:3000/gettransaction',data,this.gettoken())
    
  }


  deleteacc(acno:any){

    return this.http.delete('http://localhost:3000/deleteacc/'+acno,this.gettoken())

  }
}