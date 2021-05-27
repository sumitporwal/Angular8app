import { Component, OnInit } from '@angular/core';
import {Student} from '../student';
import {FormGroup,Validators,FormControl} from '@angular/forms';
import {StudentService} from '../student.service';
import {Router} from '@angular/router';
import {STUDENTS} from '../RegisteredStudents';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  constructor(private studentservice:StudentService,private router:Router) { }

  student:Student=new Student();
  submitted=false;
  msg;

  ngOnInit(): void {
    this.submitted=false;
  }
  

  studentForm=new FormGroup({
    name:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    phno:new FormControl('',[Validators.required,Validators.pattern("[6-9][0-9]{9}")]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    confirmpassword:new FormControl('',[Validators.required,Validators.minLength(6)])
  });
  RegisterForm(RegisterForm){
    this.student=new Student();
    this.student.name=this.studentForm.value.name;
    this.student.email=this.studentForm.value.email;
    this.student.phno=this.studentForm.value.phno;
    this.student.password=this.studentForm.value.password;
    if(this.studentForm.value.password==this.studentForm.value.confirmpassword){
      if(this.student.name.length>0 && this.student.email.length>0 && (JSON.stringify(this.student.phno)).length>0 && this.student.password.length>0){
    STUDENTS.push(this.studentForm.value);
    this.msg="Registered Successfully";
    console.log(STUDENTS);
    this.submitted=true;
      }
    }
    else{
      this.msg="Password and Confirm Password are Different";
    }
  }
  get fields(){
    return this.studentForm.controls;
  }
   get fielderr(){
    return "Field Empty";
  }
}
