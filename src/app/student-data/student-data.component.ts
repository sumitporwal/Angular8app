import { Component, OnInit,Pipe,PipeTransform  } from '@angular/core';
import {STUDENTS} from '../RegisteredStudents';
import {FormGroup,Validators,FormControl,FormArray} from '@angular/forms';
import {Student} from '../student';
import {HttpClient} from '@angular/common/http';
import $ from 'jquery';
import {Router} from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css']
})
export class StudentDataComponent implements OnInit {
  obj:keysPipe=new keysPipe();
  result;
  arr;
  name;
  size=(JSON.parse(localStorage.getItem('resource')));
  len=Object.keys(this.size).length;
  updated=new Array<boolean>(this.len);
  submitted=false;
  constructor(private http:HttpClient,private router:Router) {
   }
  ngOnInit(): void {
    /*this.http.get('assets/data.json').subscribe(data=>{
    if(!this.students)
    this.students=data;
    });*/
    for(let i=0;i<this.len;i++){
      this.updated[i]=false;
    }
    console.log(this.updated[0]);
    console.log(this.updated.length);
    let token=JSON.parse(sessionStorage.getItem('token'));
    console.log(token);
    if(token){
      this.name=token.name;
      this.result=this.obj.transform(JSON.parse(localStorage.getItem('resource')));
      if(this.result[0].value.key){
        this.arr=JSON.parse(localStorage.getItem('resource'));
      }
      else{
        this.arr=this.result;
      }
      console.log(this.arr);
    }
    else{
      this.router.navigate(['login']);
    }
  }
      

  updateForm=new FormGroup({
    //key:new FormArray((JSON.parse(localStorage.getItem('resource'))).map(data=>new FormControl(data.key,Validators.required))),
    //value:new FormArray((JSON.parse(localStorage.getItem('resource'))).map(data=>new FormControl(data.value,Validators.required))),
  });
  update(updatedkey,updatedvalue,i){
     console.log(i);
     if(this.updated[i]===false){
    this.updated[i]=true;
    console.log(this.updated[i]);
     }
     else{
      localStorage.setItem('resource',JSON.stringify(this.arr));
      console.log(JSON.parse(localStorage.getItem('resource')));
       this.updated[i]=false;
       console.log(this.updated[i]);
     }
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
 
 UpdateForm(UpdateForm){
  
 }
 delete(i){
      this.result.splice(i,1);
      localStorage.setItem('data',JSON.stringify(this.result));
      console.log(JSON.parse(localStorage.getItem('data')));
      this.submitted=true;
 }
}
@Pipe({name:'keys',pure:false})
 export class keysPipe implements PipeTransform{
   transform(value):any{
     let keys=[];
     for(let key in value){
       keys.push({key:key,value:value[key]});
     }
     return keys;
   }
 }
