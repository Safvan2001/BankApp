import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  acno=""
  psw=''
  amnt=''

  acno1=""
  psw1=''
  amnt1=''
  user=''

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router){
    // access username 
   this.user=this.ds.currentuser
   
  }
  depositForm=this.fb.group({acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]],
  amnt:['',[Validators.required,Validators.pattern('[0-9]+')]]})
  
  withdrawForm=this.fb.group({acno1:['',[Validators.required,Validators.pattern('[0-9]+')]],
  psw1:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]],
  amnt1:['',[Validators.required,Validators.pattern('[0-9]+')]]})
  deposit(){
    var acno=this.depositForm.value.acno
    var psw=this.depositForm.value.psw
    var amnt=this.depositForm.value.amnt


    if(this.depositForm.valid){
      const result=this.ds.deposit(acno,psw,amnt)
      if(result){
        alert(`${amnt} created to your ac and the balance is ${result}`)
      }else{
        alert('incurrect acnumber or password')
      }

    }else{
      alert("invalid form")
    }
   

  }

  withdraw(){
    var acno1=this.withdrawForm.value.acno1
    var psw1=this.withdrawForm.value.psw1
    var amnt1=this.withdrawForm.value.amnt1


    if(this.withdrawForm.valid){
      const result=this.ds.withdraw(acno1,psw1,amnt1)
    if(result){
      alert(`${amnt1} is debited and the balance is ${result}`)
    }


    }else{
      alert('invalid form')
    }
    



  }
  logout(){
    localStorage.removeItem('currentuser')
    localStorage.removeItem('currentacno')


    this.router.navigateByUrl('')
  }

}
