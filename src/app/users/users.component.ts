import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';
import {HttpClient} from '@angular/common/http';
import {FormGroup,Validators,FormControl} from '@angular/forms';
import $ from 'jquery';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 students;
 student;
 name;
 updateemail;
 submitted=false;
  constructor(private studentservice:StudentService,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.http.get('assets/data.json').subscribe(data=>{
    if(!this.student)
    this.student=data;
    });
    let token=JSON.parse(sessionStorage.getItem('token'));
    console.log(token);
    if(token){
      this.name=token.name;
    }
    else{
      this.router.navigate(['login']);
    }
    this.studentservice.getUserList().subscribe(data=>{
      this.students=data;
    })
  }
  openDiv(){
    $('.sidebar').width("30vw");
    $('.sidebar').css("display","block");
    $('#main').css("background-color","rgba(0,0.1,0,0.1)");
    $('app-root').css("background-color","rgba(0,0.1,0,0.1)")
    $('.closebtn').css('display',"block");
 }
  closeDiv(){
    $('.sidebar').css("display","none");
    $('#main').css("background-color","white");
    $('.closebtn').css('display',"none");
 }
 updateForm=new FormGroup({
  name:new FormControl('',Validators.required),
  email:new FormControl('',[Validators.required,Validators.email]),
  phno:new FormControl('',[Validators.required,Validators.pattern("[6-9][0-9]{9}")]),
  password:new FormControl('',[Validators.required,Validators.minLength(6)]),
});
 update(email,i){
  this.updateemail=email;
   console.log(JSON.parse(localStorage.getItem('data')));
       this.updateForm.patchValue({
         name:this.students[i].name,
         email:this.students[i].email,
         phno:this.students[i].phno,
         password:this.students[i].password,
       });
}
UpdateForm(UpdateForm){
  
}
delete(email,i){
  this.students.splice(i,1);
  localStorage.setItem('data',JSON.stringify(this.students));
  console.log(JSON.parse(localStorage.getItem('data')));
  this.submitted=true;
}
get fields(){
  return this.updateForm.controls;
}
}
