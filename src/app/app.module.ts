import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentService } from './student.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentDataComponent } from './student-data/student-data.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateStudentComponent,
    LoginComponent,
    HomeComponent,
    StudentDataComponent,
    NavbarComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
