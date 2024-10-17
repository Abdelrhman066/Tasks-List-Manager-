import { Routes } from '@angular/router';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HomeComponent } from './Components/home/home.component';
import { AddTaskComponent } from './Components/add-task/add-task.component';
import { TaskComponent } from './Components/task/task.component';

export const routes: Routes = [
  {path:'' , component: HomeComponent},
  {path:'add-task' , component: AddTaskComponent},
  {path:'task/:index' , component: TaskComponent},
  {path:'**' , component: NotFoundComponent},


];
