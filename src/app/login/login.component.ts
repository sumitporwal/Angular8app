import { Component, OnInit } from '@angular/core';
import {Student} from '../student';
import {FormGroup,Validators,FormControl} from '@angular/forms';
import {STUDENTS} from '../RegisteredStudents';
import {HttpClient} from '@angular/common/http';
import {StudentService} from '../student.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private studentservice:StudentService,private router:Router,private http:HttpClient) { }

  student:Student=new Student();
  submitted=false;
  token;
  ngOnInit(): void {
    this.submitted=false;
  }

  
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required),
  });
  LoginForm(LoginForm){
    let j=0;
    for(let i=0;i<STUDENTS.length;i++){
      if(this.loginForm.value.email===STUDENTS[i].email && this.loginForm.value.password===STUDENTS[i].password){
        j++;
      }
    }
      if(j==1){
        for(let i=0;i<STUDENTS.length;i++){
          if(this.loginForm.value.email===STUDENTS[i].email){
            this.token=JSON.stringify(STUDENTS[i]);
          }
        }
        sessionStorage.setItem('token',this.token);
        this.http.get('assets/HeadersDesign.json').subscribe(data=> {
          window.localStorage.setItem('resource', JSON.stringify(data));
        });
        console.log(this.token);
        console.log(JSON.parse(localStorage.getItem('resource')));
        this.router.navigate(['view-students']);
      }
      else{
        alert("Invalid Email or Password");
      }
  }
  get fields(){
    return this.loginForm.controls;
  }
}
