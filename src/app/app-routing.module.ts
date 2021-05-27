import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentDataComponent } from './student-data/student-data.component';
import {UsersComponent} from './users/users.component';
//import { StudentComponent } from './student/student.component';
//import {DemoComponent} from './demo/demo.component';

const routes: Routes = [
  {path:'',redirectTo:'',component:HomeComponent,pathMatch:'full'},
  {path:'register',component:CreateStudentComponent},
  {path:'login',component:LoginComponent},
  {path:'view-students',component:StudentDataComponent},
  {path:'view-faculties',component:UsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
